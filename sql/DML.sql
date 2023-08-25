-- Insert brands
insert into brand (name,description) values ('KP','Descripción de KP');
insert into brand (name,description) values ('FABER-CASTELL','Descripción de FABER-CASTELL');
insert into brand (name,description) values ('ARTESCO','Descripción de ARTESCO');
insert into brand (name,description) values ('MAPED','Descripción de MAPED');
insert into brand (name,description) values ('CRAYOLA','Descripción de CRAYOLA');
insert into brand (name,description) values ('DAVID','Descripción de DAVID');
insert into brand (name,description) values ('AMOS','Descripción de AMOS');
insert into brand (name,description) values ('STANDFORD','Descripción de STANDFORD');
insert into brand (name,description) values ('LORO','Descripción de LORO');
insert into brand (name,description) values ('CONTI','Descripción de CONTI');
insert into brand (name,description) values ('MYLANO','Descripción de MYLANO');
insert into brand (name,description) values ('ARTI CREATIVO','Descripción de ARTI CREATIVO');
insert into brand (name,description) values ('VINIFAN','Descripción de VINIFAN');
insert into brand (name,description) values ('PLAY DOH','Descripción de PLAY DOH');
insert into brand (name,description) values ('AVAL','Descripción de AVAL');
insert into brand (name,description) values ('VIRUTEX','Descripción de VIRUTEX');
insert into brand (name,description) values ('SUAVE','Descripción de SUAVE');
insert into brand (name,description) values ('NOVA','Descripción de NOVA');
insert into brand (name,description) values ('KLEENEX','Descripción de KLEENEX');
insert into brand (name,description) values ('HUGGIES','Descripción de HUGGIES');
insert into brand (name,description) values ('ARO','Descripción de ARO');

insert into school (name, description, image, address) values ('Academia Mágica Beauxbatons', 'Colegio de magía y hechicería de Francia','inserta tu enlace aqui','Los Pirineos, Francia');
insert into school (name, description, image, address) values ('Instituto Durmstrang', 'Colegio de magía y hechicería de Brasil','inserta tu enlace aqui','Selva amazónica, Brasil');
insert into school (name, description, image, address) values ('Castelobruxo', 'Colegio de magía y hechicería de Escandinavia','inserta tu enlace aqui','Escandinavia; alcances más septentrionales, ya sea de Noruega o Sweden');
insert into school (name, description, image, address) values ('Colegio Hogwarts de Magia y Hechicería', 'Colegio de magía y hechicería de Escocia','inserta tu enlace aqui','Tierras Altas de Escocia');

-- Replace your schoolId for each school you have

INSERT INTO grade (name,section,schoolId,year) VALUES
	 ('Primer grado','Primaria',6,1),
	 ('Segundo grado','Primaria',6,2),
	 ('Tercer grado','Primaria',6,3),
	 ('Cuarto grado','Primaria',6,4),
	 ('Quinto grado','Primaria',6,5),
	 ('Sexto grado','Primaria',6,6),
	 ('Primer grado','Secundaria',6,1),
	 ('Segundo grado','Secundaria',6,2),
	 ('Tercer grado','Secundaria',6,3),
	 ('Cuarto grado','Secundaria',6,4);

