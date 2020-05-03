--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: autor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.autor (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL,
    apellidos character varying(30) NOT NULL,
    ocupacion character varying(50) NOT NULL,
    idautor character varying(16) NOT NULL,
    clave character varying
);


ALTER TABLE public.autor OWNER TO postgres;

--
-- Name: autor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.autor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.autor_id_seq OWNER TO postgres;

--
-- Name: autor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.autor_id_seq OWNED BY public.autor.id;


--
-- Name: evaluador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluador (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL,
    apellidos character varying(30) NOT NULL,
    idevaluador character varying(16) NOT NULL,
    afiliacion character varying NOT NULL,
    cargo character varying NOT NULL,
    clave character varying
);


ALTER TABLE public.evaluador OWNER TO postgres;

--
-- Name: evaluador_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evaluador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.evaluador_id_seq OWNER TO postgres;

--
-- Name: evaluador_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evaluador_id_seq OWNED BY public.evaluador.id;


--
-- Name: publicacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publicacion (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL,
    materiaestudio character varying NOT NULL,
    idautor character varying(16) NOT NULL
);


ALTER TABLE public.publicacion OWNER TO postgres;

--
-- Name: publicacion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.publicacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.publicacion_id_seq OWNER TO postgres;

--
-- Name: publicacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.publicacion_id_seq OWNED BY public.publicacion.id;


--
-- Name: publicacionrevision; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publicacionrevision (
    id integer NOT NULL,
    idpublicacion integer NOT NULL,
    data character varying NOT NULL,
    fechasubida date NOT NULL,
    estado integer NOT NULL
);


ALTER TABLE public.publicacionrevision OWNER TO postgres;

--
-- Name: publicacionrevision_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.publicacionrevision_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.publicacionrevision_id_seq OWNER TO postgres;

--
-- Name: publicacionrevision_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.publicacionrevision_id_seq OWNED BY public.publicacionrevision.id;


--
-- Name: registroevaluacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.registroevaluacion (
    id integer NOT NULL,
    fechaevaluacion date NOT NULL,
    organizacion double precision NOT NULL,
    estilo double precision NOT NULL,
    temporalidad double precision NOT NULL,
    aportesobras double precision NOT NULL,
    resultadofinal double precision NOT NULL,
    concepto integer NOT NULL,
    idevaluador character varying(16) NOT NULL,
    idpublicacionrevision integer NOT NULL
);


ALTER TABLE public.registroevaluacion OWNER TO postgres;

--
-- Name: registroevaluacion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.registroevaluacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registroevaluacion_id_seq OWNER TO postgres;

--
-- Name: registroevaluacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.registroevaluacion_id_seq OWNED BY public.registroevaluacion.id;


--
-- Name: autor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.autor ALTER COLUMN id SET DEFAULT nextval('public.autor_id_seq'::regclass);


--
-- Name: evaluador id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluador ALTER COLUMN id SET DEFAULT nextval('public.evaluador_id_seq'::regclass);


--
-- Name: publicacion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicacion ALTER COLUMN id SET DEFAULT nextval('public.publicacion_id_seq'::regclass);


--
-- Name: publicacionrevision id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicacionrevision ALTER COLUMN id SET DEFAULT nextval('public.publicacionrevision_id_seq'::regclass);


--
-- Name: registroevaluacion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroevaluacion ALTER COLUMN id SET DEFAULT nextval('public.registroevaluacion_id_seq'::regclass);


--
-- Data for Name: autor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.autor (id, nombre, apellidos, ocupacion, idautor, clave) FROM stdin;
6	alejandro	suaza builes	estudiante	1001651816	\N
7	santiago	suaza builes	estudiante	10041651816	\N
9	alejandro	suaza builes	estudiante	100165	202cb962ac59075b964b07152d234b70
\.


--
-- Data for Name: evaluador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evaluador (id, nombre, apellidos, idevaluador, afiliacion, cargo, clave) FROM stdin;
6	saurmo	nan	10012	coomeva	maestro catedra	\N
7	ochoscar	ochoa	10013	sura	maestro catedra	202cb962ac59075b964b07152d234b70
5	ochoscar	ochoa	1001	sura	maestro dee catedra	\N
\.


--
-- Data for Name: publicacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.publicacion (id, nombre, materiaestudio, idautor) FROM stdin;
8	uml	desarrollo software	1001651816
9	app movil	proyecto jaime	1001651816
5	api rest	desarrollo web	100165
10	api rest	desarrollo web	100165
\.


--
-- Data for Name: publicacionrevision; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.publicacionrevision (id, idpublicacion, data, fechasubida, estado) FROM stdin;
4	5	auron.com	2020-01-31	1
5	5	auron.com	2020-01-31	1
6	5	auron.com	2020-01-31	1
7	5	auron.com	2020-01-31	1
8	5	auron.com	2020-01-31	1
9	8	auron.com	2020-01-31	1
10	8	auron.com	2020-01-31	1
11	8	auron.com	2020-01-31	1
3	8	lkjafdlkjafd	2020-01-31	1
2	8	rubius	2020-01-31	1
12	5	flutter	2020-01-31	1
14	9	dart	2020-01-31	1
13	8	scala	2020-01-31	1
21	8	flutter	2020-01-18	1
22	8	flutter	2020-01-19	0
\.


--
-- Data for Name: registroevaluacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.registroevaluacion (id, fechaevaluacion, organizacion, estilo, temporalidad, aportesobras, resultadofinal, concepto, idevaluador, idpublicacionrevision) FROM stdin;
9	2020-01-03	5	5	5	5	5	1	10012	13
7	2020-01-03	5	5	5	5	4	1	10012	14
14	2020-01-15	5	5	5	5	5	1	10012	21
\.


--
-- Name: autor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.autor_id_seq', 10, true);


--
-- Name: evaluador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evaluador_id_seq', 7, true);


--
-- Name: publicacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publicacion_id_seq', 10, true);


--
-- Name: publicacionrevision_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publicacionrevision_id_seq', 22, true);


--
-- Name: registroevaluacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.registroevaluacion_id_seq', 14, true);


--
-- Name: autor autor_idautor_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.autor
    ADD CONSTRAINT autor_idautor_key UNIQUE (idautor);


--
-- Name: autor autor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.autor
    ADD CONSTRAINT autor_pkey PRIMARY KEY (id);


--
-- Name: evaluador evaluador_idevaluador_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluador
    ADD CONSTRAINT evaluador_idevaluador_key UNIQUE (idevaluador);


--
-- Name: evaluador evaluador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluador
    ADD CONSTRAINT evaluador_pkey PRIMARY KEY (id);


--
-- Name: publicacion publicacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicacion
    ADD CONSTRAINT publicacion_pkey PRIMARY KEY (id);


--
-- Name: publicacionrevision publicacionrevision_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicacionrevision
    ADD CONSTRAINT publicacionrevision_pkey PRIMARY KEY (id);


--
-- Name: registroevaluacion registroevaluacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroevaluacion
    ADD CONSTRAINT registroevaluacion_pkey PRIMARY KEY (id);


--
-- Name: registroevaluacion fk_eval_evaluador; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroevaluacion
    ADD CONSTRAINT fk_eval_evaluador FOREIGN KEY (idevaluador) REFERENCES public.evaluador(idevaluador) ON UPDATE CASCADE;


--
-- Name: registroevaluacion fk_eval_public; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroevaluacion
    ADD CONSTRAINT fk_eval_public FOREIGN KEY (idpublicacionrevision) REFERENCES public.publicacionrevision(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: publicacion fk_publi_autor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicacion
    ADD CONSTRAINT fk_publi_autor FOREIGN KEY (idautor) REFERENCES public.autor(idautor) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: publicacionrevision fk_publi_correc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicacionrevision
    ADD CONSTRAINT fk_publi_correc FOREIGN KEY (idpublicacion) REFERENCES public.publicacion(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

