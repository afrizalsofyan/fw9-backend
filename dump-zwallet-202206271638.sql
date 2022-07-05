--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-07-05 23:14:22

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
-- TOC entry 3354 (class 1262 OID 16482)
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
-- TOC entry 3355 (class 0 OID 0)
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
-- TOC entry 3356 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 841 (class 1247 OID 16723)
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
    phone_number character varying(20),
    personal_inf text,
    photo_url text,
    balance money NOT NULL,
    user_id integer
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
    amount integer NOT NULL
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
    type_desc character varying(255)
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
    pin_number character varying(6) NOT NULL,
    is_deleted boolean DEFAULT true NOT NULL
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
-- TOC entry 3344 (class 0 OID 16495)
-- Dependencies: 212
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (id, first_name, last_name, phone_number, personal_inf, photo_url, balance, user_id) FROM stdin;
44	pr1	pr1	+62888 8888 7772	aaa	http://asdasdsadasdsad.co	$100,000.00	7
46	pr2	pr12	+62888 8888 9999	aaa	http://asdasdsadasdsad.co	$100,000.00	10
1	pr1	pr1	+62888 8888 7772	aaa	adssadasdsadasd d	$100,000.00	1
3	pr1	pr1	+62888 8888 7772	aaa	adssadasdsadasd d	$100,000.00	3
4	pr1	pr1	+62888 8888 7772	aaa	adssadasdsadasd d	$100,000.00	4
5	pr1	pr1	+62888 8888 7772	aaa	adssadasdsadasd d	$100,000.00	5
8	pr1	pr1	+62888 8888 7772	aaa	adssadasdsadasd d	$100,000.00	6
\.


--
-- TOC entry 3346 (class 0 OID 16508)
-- Dependencies: 214
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction (id, time_transaction, notes, type_id, recipient_id, sender_id, amount) FROM stdin;
7	2022-03-26 17:32:20	notes3	1	1	\N	1000000
8	2022-05-26 17:32:20	notes4	1	1	\N	1000
1	2022-01-27 15:32:20	notes1	1	1	\N	11111
2	2022-01-27 15:32:20	notes1	1	1	\N	12121
3	2022-02-25 15:32:20	notes2	1	1	\N	123
4	2022-02-25 16:32:20	notes2	1	1	\N	12354
5	2022-02-26 16:32:20	notes2	1	1	\N	33550
6	2022-03-26 16:32:20	notes3	1	1	\N	555000
9	2022-06-26 17:32:20	notes4	1	1	\N	20030
10	2022-06-26 17:32:20	notes4	1	1	\N	30500
11	2022-07-26 17:32:20	notes5	1	1	\N	60000
12	2022-08-26 17:32:20	notes5	1	1	\N	80000
13	2022-08-26 17:32:20	notes6	1	1	\N	956500
\.


--
-- TOC entry 3348 (class 0 OID 16592)
-- Dependencies: 216
-- Data for Name: transaction_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_type (id, type_name, type_desc) FROM stdin;
1	payment	for payment
2	subcription	for subcription
3	transafer	for transfer
\.


--
-- TOC entry 3342 (class 0 OID 16484)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, pin_number, is_deleted) FROM stdin;
3	user3	user3@mail.com	$2b$10$O1szM5CziZBiay2V.mbHsepTKu1vWMBS.qBUsDVm4IHSkMblyTVOO	123456	t
4	user4	user4@mail.com	$2b$10$hhjgJY6OJCDMt2xgbf7Cfuf0b7pKTmcf1Qcmxx1yxYPNuAwW0Ked6	123456	t
6	user6	user6@mail.com	$2b$10$Zg/aZHDwc30fNiF0MM0vBewYgG6tdLq7jeG.3PdNP.xj3KIEANk2q	123456	t
7	user7	user7@mail.com	$2b$10$N.PaBhxEh1GjIo9YugihC.u6IYKcgyFnH3nIl4L9axdaex60bKcxu	123456	t
8	user8	user8@mail.com	$2b$10$H3uJodSrPMEGQvn.mDQ7kuzvXlkdwhWPdGolByGWkZxlzkcO.kvgC	123456	t
9	user9	user9@mail.com	$2b$10$2QE3s8wk2TAJAL.byFpgeudkXczJ4ukNgWE8CYrPHlI8fP0x2jfp.	123456	t
10	user10	user10@mail.com	$2b$10$zS//gDIVWMimgHFx5RVYPuuuVtFCCpTqTILkNWhS5obWs6YixHZNK	123456	t
11	admin1	admin1@mail.com	$2b$10$4woSv.pg4ekE.sHAKOee1e9wND35vj8dI48f/GfngH4e5i4/Xm3Tq	123456	t
12	admin2	admin2@mail.com	$2b$10$ppm7O.Eq/fn1n0eyiYAQdeBtGFEgrbs5tFEF9Uo6Je8J44RfqCoti	123456	t
13	iniadmin3	admin3@gmail.com	$2b$10$csl3XgxLNj0e494oECIRMe8smK80RGC8G1ExnqZIV02DLZwoLcm0O	111111	t
5	user5	user5@mail.com	$2b$10$ZMJHbEt/QyTvDu6JbKXsy.u8OZsqBY2HCz0Bu2cfjUR8xnVw1g6ZS	123456	f
14	admin4	admin4@mail.com	$2b$10$OcbizJ7tdWXf2mnE2Fte.uT6Kl4kLoBvDjveAkFll0zmEqjg0KZQK	123456	t
21	admin5	admin5@mail.com	$2b$10$WDXVXYhjtroJyfItnSJafeY7QkL042G7JVWD5iFQjI2MFGXuiF.o2	123456	t
1	iniupdate	update@gmail.com	$2b$10$kq0mLTP5k8npMUcSe/xmJ.pJ0unsRRjzrEq0piBzETUr4FRo.b5je	111111	f
\.


--
-- TOC entry 3357 (class 0 OID 0)
-- Dependencies: 211
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_id_seq', 56, true);


--
-- TOC entry 3358 (class 0 OID 0)
-- Dependencies: 213
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 20, true);


--
-- TOC entry 3359 (class 0 OID 0)
-- Dependencies: 215
-- Name: transaction_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_type_id_seq', 3, true);


--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 21, true);


--
-- TOC entry 3184 (class 2606 OID 16773)
-- Name: users email_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email_un UNIQUE (email);


--
-- TOC entry 3191 (class 2606 OID 16501)
-- Name: profile profile_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pk PRIMARY KEY (id);


--
-- TOC entry 3193 (class 2606 OID 16797)
-- Name: profile profile_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_un UNIQUE (user_id);


--
-- TOC entry 3195 (class 2606 OID 16514)
-- Name: transaction transaction_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pk PRIMARY KEY (id);


--
-- TOC entry 3197 (class 2606 OID 16598)
-- Name: transaction_type transaction_type_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_type
    ADD CONSTRAINT transaction_type_pk PRIMARY KEY (id);


--
-- TOC entry 3186 (class 2606 OID 16771)
-- Name: users username_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username_un UNIQUE (username);


--
-- TOC entry 3189 (class 2606 OID 16490)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- TOC entry 3187 (class 1259 OID 16493)
-- Name: users_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_id_idx ON public.users USING btree (id);


--
-- TOC entry 3198 (class 2606 OID 16789)
-- Name: profile profile_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3199 (class 2606 OID 24977)
-- Name: transaction reciepent_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT reciepent_fk FOREIGN KEY (recipient_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3200 (class 2606 OID 24982)
-- Name: transaction sender_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT sender_fk FOREIGN KEY (sender_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3201 (class 2606 OID 24987)
-- Name: transaction type_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT type_fk FOREIGN KEY (type_id) REFERENCES public.transaction_type(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2022-07-05 23:14:25

--
-- PostgreSQL database dump complete
--

