CREATE OR REPLACE FUNCTION match_mentors(
    p_mentee_id BIGINT,
    p_limit INT DEFAULT 20
)
RETURNS TABLE (
    mentor_id BIGINT,
    mentor_user_id BIGINT,
    score NUMERIC,
    lang_score NUMERIC,
    learning_goal_score NUMERIC,
    job_capability_score NUMERIC,
    leadership_overlap INT
)
LANGUAGE sql
AS $$
WITH mentee AS (
    SELECT 
        u.id AS user_id,
        u.languages,
        u.gcb_level,
        u.gcb_tenure,
        u.location,
        u.business_area_id,
        mp.same_location,
        mp.same_business_area,
        mp.learning_goals,
        mp.job_capabilities
    FROM mentee_profiles mp
    JOIN users u ON u.id = mp.id
    WHERE mp.id = p_mentee_id
)
SELECT 
    mp.id AS mentor_id,
    mu.id AS mentor_user_id,

    (
        -- 1. Language fuzzy match
        10 * (
            SELECT COALESCE(
                MAX(similarity(ml, ANY(mentee.languages))), 
            0)
            FROM unnest(mu.languages) ml
        )

        -- 2. Learning goals fuzzy match
        + 6 * (
            SELECT COALESCE(
                MAX(similarity(ae.name, ANY(mentee.learning_goals))),
            0)
            FROM mentor_additional_experiences mae
            JOIN additional_experience ae ON ae.id = mae.additional_experience_id
            WHERE mae.mentor_id = mp.id
        )

        -- 3. Job capabilities fuzzy match
        + 6 * (
            SELECT COALESCE(
                MAX(similarity(le.name, ANY(mentee.job_capabilities))),
            0)
            FROM mentor_leadership_experiences mle
            JOIN leadership_experience le ON le.id = mle.leadership_experience_id
            WHERE mle.mentor_id = mp.id
        )

        -- 4. Leadership ID overlap
        + 5 * (
            SELECT COUNT(*)
            FROM mentor_leadership_experiences mle
            JOIN mentee_leadership_experiences mte
                ON mte.leadership_experience_id = mle.leadership_experience_id
            WHERE mte.mentee_id = p_mentee_id
              AND mle.mentor_id = mp.id
        )
    ) AS score,

    -- Debug values for tuning
    (
        SELECT COALESCE(
            MAX(similarity(ml, ANY(mentee.languages))), 
        0)
        FROM unnest(mu.languages) ml
    ) AS lang_score,

    (
        SELECT COALESCE(
            MAX(similarity(ae.name, ANY(mentee.learning_goals))), 
        0)
        FROM mentor_additional_experiences mae
        JOIN additional_experience ae ON ae.id = mae.additional_experience_id
        WHERE mae.mentor_id = mp.id
    ) AS learning_goal_score,

    (
        SELECT COALESCE(
            MAX(similarity(le.name, ANY(mentee.job_capabilities))), 
        0)
        FROM mentor_leadership_experiences mle
        JOIN leadership_experience le ON le.id = mle.leadership_experience_id
        WHERE mle.mentor_id = mp.id
    ) AS job_capability_score,

    (
        SELECT COUNT(*)
        FROM mentor_leadership_experiences mle
        JOIN mentee_leadership_experiences mte
            ON mte.leadership_experience_id = mle.leadership_experience_id
        WHERE mte.mentee_id = p_mentee_id
          AND mle.mentor_id = mp.id
    ) AS leadership_overlap

FROM mentor_profile mp
JOIN users mu ON mu.id = mp.id
CROSS JOIN mentee

WHERE TRUE

-- HARD FILTERS
AND (
    SELECT COALESCE(MAX(similarity(ml, ANY(mentee.languages))), 0)
    FROM unnest(mu.languages) ml
) > 0.4   -- language similarity threshold

AND (
    mu.gcb_level = mentee.gcb_level + 1
    OR mu.gcb_level = mentee.gcb_level
)

AND (
    CASE 
        WHEN mentee.gcb_tenure <= 2 THEN mu.gcb_tenure >= 3
        ELSE TRUE
    END
)

AND (
    NOT mentee.same_location
    OR mu.location = mentee.location
)

AND (
    NOT mentee.same_business_area
    OR mu.business_area_id = mentee.business_area_id
)

ORDER BY score DESC
LIMIT p_limit;
$$;