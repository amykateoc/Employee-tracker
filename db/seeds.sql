INSERT INTO employee, (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Amy", "DiPiazza", 001),
       (002, "Savannah", "Summy", 002),
       (003, "Kojak", "Summy", 003, 002),
       (004, "MuddyHeinz", "DiPiazza", 004, 001);

INSERT INTO role, (id, title, salary, department_id)
VALUES (001, "CEO", 500000.00, 001),
        (002, "CFO", 490000.00, 001),
        (003, "Groundskeeper", 50000.00, 002),
        (004, "Security", 80000.00, 003);

INSERT INTO department, (id, name)
VALUES (001, Executive),
        (002, Operations),
        (003, Security);