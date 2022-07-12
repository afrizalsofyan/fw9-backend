--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-07-12 09:26:32

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

DROP DATABASE zwallet;
--
-- TOC entry 3359 (class 1262 OID 16482)
-- Name: zwallet; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE zwallet WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE zwallet OWNER TO postgres;

\connect zwallet

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
-- TOC entry 3360 (class 0 OID 0)
-- Name: zwallet; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE zwallet SET "TimeZone" TO 'Zulu';


\connect zwallet

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
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 838 (class 1247 OID 16723)
-- Name: type_transaction_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.type_transaction_enum AS ENUM (
    'Transfer',
    'Subscription',
    'Payment'
);


ALTER TYPE public.type_transaction_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 16495)
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    phone_number character varying[],
    photo_url text,
    user_id integer NOT NULL,
    balance integer
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16494)
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.profile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 214 (class 1259 OID 16508)
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    time_transaction timestamp without time zone NOT NULL,
    notes text,
    type_id integer,
    recipient_id integer,
    sender_id integer,
    amount integer NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16507)
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transaction ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16592)
-- Name: transaction_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_type (
    id integer NOT NULL,
    type_name character varying(255) NOT NULL,
    type_desc character varying(255),
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.transaction_type OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16591)
-- Name: transaction_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transaction_type ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transaction_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 210 (class 1259 OID 16484)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    pin_number integer,
    is_deleted boolean DEFAULT false NOT NULL,
    verified boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16483)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3349 (class 0 OID 16495)
-- Dependencies: 212
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (id, first_name, last_name, phone_number, photo_url, user_id, balance) FROM stdin;
46	ira update	rasa	{"082233444444,082233445555"}	localhost:3335/images/uploud/1657463938802.png	81	44400000
47	\N	\N	\N	\N	79	101634000
45	ira update	rasa	{"081276554470,082233445562"}	localhost:3335/images/uploud/1657463308182.png	80	1000000
\.


--
-- TOC entry 3351 (class 0 OID 16508)
-- Dependencies: 214
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction (id, time_transaction, notes, type_id, recipient_id, sender_id, amount, is_deleted) FROM stdin;
38	2022-07-11 00:30:48	this new transaction	14	79	81	200000	f
39	2022-07-11 00:33:58	this new transaction	14	79	81	200000	f
40	2022-07-11 00:35:09	this new transaction	14	79	81	384000	f
41	2022-07-11 00:36:54	this new transaction	14	79	81	1000000	f
42	2022-07-11 00:58:25	this new transaction2	14	79	81	100000	f
43	2022-07-11 00:58:38	this new transaction2	14	79	81	160000	f
44	2022-07-11 11:35:14	this new transaction2	14	79	81	160000	f
57	2022-07-11 17:46:33	this new transaction2	14	79	81	160000	f
58	2022-07-11 17:47:01	this new transaction2	14	79	81	16000	f
59	2022-07-11 17:47:11	this new transaction2	14	79	81	16000	f
9	2022-08-26 17:32:20	notes2	15	6	5	322133	f
11	2022-08-26 17:32:20	notes4	15	6	5	907986876	f
12	2022-08-26 17:32:20	notes5	15	6	5	90798	f
60	2022-07-11 17:47:35	this new transaction2	14	79	81	160000	f
63	2022-07-11 17:52:15	this new transaction2	14	79	81	160000	f
64	2022-07-11 17:52:43	this new transaction2	14	79	81	160000	f
65	2022-07-11 17:53:30	this new transaction2	14	79	81	160000	f
66	2022-07-11 17:53:51	this new transaction2	14	79	81	16000	f
67	2022-07-11 17:54:47	this new transaction2	14	79	81	16000	f
68	2022-07-11 18:05:57	this new transaction2	14	79	81	16000	f
69	2022-07-11 18:10:45	this new transaction2	14	79	81	16000	f
10	2022-08-26 17:32:20	notes3	15	6	5	356487	t
70	2022-07-11 18:11:28	this new transaction2	14	79	81	16000	f
71	2022-07-11 18:11:40	this new transaction2	14	79	81	16000	f
72	2022-07-11 18:23:35	this new transaction2	14	79	81	16000	f
73	2022-07-11 18:25:21	this new transaction2	14	79	81	16000	f
83	2022-07-11 18:49:49	this new transaction3	14	79	81	50000	f
84	2022-07-11 18:50:17	payment shooping	14	79	81	50000	f
85	2022-07-11 18:50:25	payment shooping	14	79	81	500000	f
86	2022-07-11 18:50:30	payment shooping	14	79	81	5000000	f
87	2022-07-11 18:50:38	payment shooping	14	79	81	50000000	f
35	2022-07-11 00:25:22	this new transaction	14	79	81	2000	f
36	2022-07-11 00:26:15	this new transaction	14	79	81	2000	f
37	2022-07-11 00:26:26	this new transaction	14	79	81	200000	f
\.


--
-- TOC entry 3353 (class 0 OID 16592)
-- Dependencies: 216
-- Data for Name: transaction_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_type (id, type_name, type_desc, is_deleted) FROM stdin;
14	payment	for payment	f
15	subcription	for subcription	t
13	update	update value	t
\.


--
-- TOC entry 3347 (class 0 OID 16484)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, pin_number, is_deleted, verified) FROM stdin;
78	irasa0	irasa0@mail.com	$2b$10$kz.uhw4i3VYAp6jnuhiqz.idNuxFOEIgTnzqu0PdPhYlvyXEmVUZO	555555	f	f
80	irasaaa	irasaaa@mail.com	$2b$10$E06TY/fkIpyB/U8/MMHVVOZNLkWYWHRn7pcbjtaZ1FjmZc5WXNPFW	555555	f	f
81	irasaaa2	irasaaa2@mail.com	$2b$10$/k5Iyro3mUxDS6mNL/PIWuwAHV5hzHZHBDT.Ejm.Y4jw0hCfy4BiS	\N	f	f
4	admin2	admin2@mail.com	$2b$10$bcBYIyUxENiHKiVYWgyY0eYy.Ab4AjK2YBieIKa/Ebg/runE/raf.	123456	f	t
5	admin3	admin3@mail.com	$2b$10$F8YlVvQvtUmOUPm5i0VpZ.P74348MRWVGedMfJk5Tluav49up86eG	123456	f	t
79	irasaa	irasaa@mail.com	$2b$10$rrkTwJSesXZi2cgugnyJse8kqexlzX9GR7n4h104aUPuDxUDbmrjS	\N	f	f
39	irasa	ira@mail.com	$2b$10$bsUh7ewbLBFsCr9giXGPdukKE4pMlzjDHVEKp6RaQDN0Pz2tL3cvq	\N	f	f
44	irasa2	irasa@mail.com	$2b$10$x1W5FkA2dhs24/01jgvNo.jcVQAyPlWhM5QU9kgotPnFda4Sw05pO	\N	f	f
49	irasa4	irasa3@mail.com	$2b$10$1nx7LSUwfmREbVITcz8YOuVCp6IueQXOjner8F1weXi1PZX3yPAju	\N	f	f
6	user1	user1@mail.com	$2b$10$D.8XDtWeNcW1j0AtCpK6vOnQ/NWWRXgbG///oDDAuxoJGZPYuM0pu	123456	f	t
7	user2	user2@mail.com	$2b$10$0qPqrltdxqhaT05lxQKWWuxF/YFV6ILNNxhWouHVpObtqISx9c0Rq	123456	f	t
8	user3	user3@mail.com	$2b$10$k.xQ9s73Zhi7gNwwX3uyAeN7Ea7Qh7.mGxd8s4Joa2OT0IcwEPciu	123456	f	t
9	user4	user4@mail.iiiop	$2b$10$tSFlZnIbH3t6kKOpw/dOxOHnvDUEB4/gB81Kfn2J6NiLJuzmpZgUm	123456	f	t
10	user5	user5@gmail.lp	$2b$10$NvKf8Et4xPIhXUmKI8y9T.S6Ouz5NjDH.RoLE9JcLUcZdCBXujUr.	123456	f	t
11	user6	user6+1@gmail.lp	$2b$10$VubNa6vjqI7l9/782ZBeqejGzIeB/IL8aTQ9K5BSVK97K.CfoQoDK	123456	f	t
12	user7	user6@gmail.com	$2b$10$PJHiYTr8Q8gAF/sncp922O.kvhRkxMKvq60XDUd8rOuttaDjoa7ZC	123456	f	t
14	user9	user9@gmail.com	$2b$10$l1YbrDIOx7RJTMwDXHBHeOh7fGwargb4IjsxXsqDLk0alyHsqys8K	123456	f	t
48	irasa3	irasa2@mail.com	$2b$10$ahxzLbF/RtOB75Nh28a2h.30DsVB6o4IGQ27digCAbieoVv0GI9zi	123456	f	t
52	irasa5	irasa5@mail.com	$2b$10$hFLGwdehnTms/64DLM.9PeY4ZmUGWfnCnkTO70/XdbK2a4Vs4S/c2	123456	f	t
71	irasa9	irasa9@mail.com	$2b$10$isyRMp/SeGyLkPJvqriB4.FeTuYMwypaalh0pT2o59HQLHGwDf/FG	555555	f	t
58	irasa6	irasa6@mail.com	$2b$10$42lSyucm8mdEZAmve.qrluJW/yP.qT5ffQHS/Ic1ip5FqUAy16Hfm	555	f	t
60	irasa7	irasa7@mail.com	$2b$10$cNXlX9RHlYpEDKDYabL7Y.T1XXREp8IvmbpvFkbOlo/QoKnDulFrC	555666	f	t
65	irasa8	irasa8@mail.com	$2b$10$86S1BkfxlEazF7TtZwYuMe9x5bgH67vI1.LUyhu7x4jGgWoiAhqlm	555666	f	t
\.


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 211
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_id_seq', 47, true);


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 213
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 87, true);


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 215
-- Name: transaction_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_type_id_seq', 15, true);


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 81, true);


--
-- TOC entry 3187 (class 2606 OID 16773)
-- Name: users email_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email_un UNIQUE (email);


--
-- TOC entry 3194 (class 2606 OID 16501)
-- Name: profile profile_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pk PRIMARY KEY (id);


--
-- TOC entry 3196 (class 2606 OID 16797)
-- Name: profile profile_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_un UNIQUE (user_id);


--
-- TOC entry 3198 (class 2606 OID 16514)
-- Name: transaction transaction_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pk PRIMARY KEY (id);


--
-- TOC entry 3200 (class 2606 OID 16598)
-- Name: transaction_type transaction_type_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_type
    ADD CONSTRAINT transaction_type_pk PRIMARY KEY (id);


--
-- TOC entry 3202 (class 2606 OID 25007)
-- Name: transaction_type transaction_type_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_type
    ADD CONSTRAINT transaction_type_un UNIQUE (type_name);


--
-- TOC entry 3189 (class 2606 OID 16771)
-- Name: users username_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username_un UNIQUE (username);


--
-- TOC entry 3192 (class 2606 OID 16490)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- TOC entry 3190 (class 1259 OID 16493)
-- Name: users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_id_idx ON public.users USING btree (id);


--
-- TOC entry 3203 (class 2606 OID 16789)
-- Name: profile profile_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3204 (class 2606 OID 24977)
-- Name: transaction reciepent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT reciepent_fk FOREIGN KEY (recipient_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3205 (class 2606 OID 24982)
-- Name: transaction sender_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT sender_fk FOREIGN KEY (sender_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3206 (class 2606 OID 24987)
-- Name: transaction type_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT type_fk FOREIGN KEY (type_id) REFERENCES public.transaction_type(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2022-07-12 09:26:34

--
-- PostgreSQL database dump complete
--

