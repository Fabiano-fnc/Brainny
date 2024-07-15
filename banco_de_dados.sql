--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Ubuntu 14.12-1.pgdg22.04+1)
-- Dumped by pg_dump version 14.12 (Ubuntu 14.12-1.pgdg22.04+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: registered_time; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.registered_time (
    user_id integer,
    registered_time timestamp without time zone,
    id integer NOT NULL
);


ALTER TABLE public.registered_time OWNER TO postgres;

--
-- Name: registered_time_new_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.registered_time_new_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registered_time_new_id_seq OWNER TO postgres;

--
-- Name: registered_time_new_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.registered_time_new_id_seq OWNED BY public.registered_time.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying,
    email character varying NOT NULL,
    senha character varying,
    role character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: registered_time id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registered_time ALTER COLUMN id SET DEFAULT nextval('public.registered_time_new_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: registered_time; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.registered_time (user_id, registered_time, id) FROM stdin;
2	2024-07-15 14:10:18.125	248
2	2024-07-15 14:10:25.487	249
3	2024-07-15 14:12:05.443	250
3	2024-07-15 14:13:27.182	251
3	2024-07-15 14:14:53.067	252
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, senha, role) FROM stdin;
2	Maria	maria@brainny.cc	mariaregister	Colaborador
3	João	joao@brainny.cc	joaoregister	Colaborador
4	Amanda	amanda@brainny.cc	amandaregister	Colaborador
1	Admin	admin@brainny.cc	adminregister	Administrador
\.


--
-- Name: registered_time_new_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.registered_time_new_id_seq', 252, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: registered_time fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registered_time
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

