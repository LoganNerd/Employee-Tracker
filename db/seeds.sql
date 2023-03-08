use company_db

INSERT INTO department 
(department_name)
    VALUES 
    ("Executive"),
    ("Salesforce"),
    ("Engineers"),
    ("Builders");

INSERT INTO roles
(title, salary, department_id)
    VALUES 
    ("Engineer", 500000, 3),
    ("Architect", 250000, 2),
    ("Manager", 225000, 1),
    ("Salesman", 225000, 4);

INSERT INTO employees 
(first_name, last_name, roles_id, manager_id )
    VALUES 
    ("Luke", "Perry", 4, 1),
    ("Strad", "Man", 4, 2),
    ("Ung", "Kenny", 4, 1),
    ("Phillip", "Bossman", 2, NULL),
    ("Dats", "Flame", 2, 3),
    ("Ben", "Dover", 1, 6),
    ("Beverly", "Crusher", 3, NULL);