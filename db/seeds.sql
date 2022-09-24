INSERT INTO department
    (name)
VALUES
    ('HR'),
    ('Tech'),
    ('Analytics'),
    ('Custodial'),
    ('Execs');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Software Engineer', 100000, 2),
    ('Data Scientist', 110000, 3),
    ('Financial Analyst', 80000, 3),
    ('Janitor', 50000, 4),
    ('VP', 250000, 5),
    ('Outside Recruiter', 70000, 1),
    ('Recruitment Manager', 90000, 1),
    ('CEO', 1000000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Joel', 'Oommen', 1, 1),
    ('Muhammad', 'Ali', 8, NULL),
    ('John', 'Cena', 3, 2),
    ('John', 'Terry', 2, 2);
