--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Debian 13.1-1.pgdg100+1)
-- Dumped by pg_dump version 13.1 (Debian 13.1-1.pgdg100+1)

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
-- Name: instructor_login(text); Type: FUNCTION; Schema: public; Owner: test_user
--

CREATE FUNCTION public.instructor_login(given_email text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE 
    result TEXT;
BEGIN
    SELECT i.email INTO result
    FROM instructor i;
    
    RETURN result;
END;
$$;


ALTER FUNCTION public.instructor_login(given_email text) OWNER TO test_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: exercise; Type: TABLE; Schema: public; Owner: test_user
--

CREATE TABLE public.exercise (
    "exerciseName" character varying(50) NOT NULL
);


ALTER TABLE public.exercise OWNER TO test_user;

--
-- Name: instructor; Type: TABLE; Schema: public; Owner: test_user
--

CREATE TABLE public.instructor (
    "instructorId" integer NOT NULL,
    email character varying(50) NOT NULL,
    "hashedPassword" character varying(150) NOT NULL
);


ALTER TABLE public.instructor OWNER TO test_user;

--
-- Name: instructor_instructorId_seq; Type: SEQUENCE; Schema: public; Owner: test_user
--

CREATE SEQUENCE public."instructor_instructorId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."instructor_instructorId_seq" OWNER TO test_user;

--
-- Name: instructor_instructorId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test_user
--

ALTER SEQUENCE public."instructor_instructorId_seq" OWNED BY public.instructor."instructorId";


--
-- Name: learner; Type: TABLE; Schema: public; Owner: test_user
--

CREATE TABLE public.learner (
    "learnerId" integer NOT NULL,
    "firstName" character varying(50) NOT NULL,
    "lastName" character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    snatch numeric(5,2) DEFAULT 0,
    clean numeric(5,2) DEFAULT 0,
    jerk numeric(5,2) DEFAULT 0,
    "cleanAndJerk" numeric(5,2) DEFAULT 0,
    "backSquat" numeric(5,2) DEFAULT 0,
    "frontSquat" numeric(5,2) DEFAULT 0,
    "pushPress" numeric(5,2) DEFAULT 0,
    "programmeId" integer,
    username character varying(50) DEFAULT 'foo'::character varying NOT NULL
);


ALTER TABLE public.learner OWNER TO test_user;

--
-- Name: learner_learnerId_seq; Type: SEQUENCE; Schema: public; Owner: test_user
--

CREATE SEQUENCE public."learner_learnerId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."learner_learnerId_seq" OWNER TO test_user;

--
-- Name: learner_learnerId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test_user
--

ALTER SEQUENCE public."learner_learnerId_seq" OWNED BY public.learner."learnerId";


--
-- Name: practice_bests; Type: TABLE; Schema: public; Owner: test_user
--

CREATE TABLE public.practice_bests (
    "pbId" integer NOT NULL,
    "learnerId" integer NOT NULL,
    "exerciseName" character varying(50) NOT NULL,
    "repMax" character varying(3) NOT NULL,
    weight numeric(5,2) DEFAULT 0 NOT NULL,
    "lastEdited" date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.practice_bests OWNER TO test_user;

--
-- Name: practice_bests_pbId_seq; Type: SEQUENCE; Schema: public; Owner: test_user
--

CREATE SEQUENCE public."practice_bests_pbId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."practice_bests_pbId_seq" OWNER TO test_user;

--
-- Name: practice_bests_pbId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test_user
--

ALTER SEQUENCE public."practice_bests_pbId_seq" OWNED BY public.practice_bests."pbId";


--
-- Name: programme; Type: TABLE; Schema: public; Owner: test_user
--

CREATE TABLE public.programme (
    "programmeId" integer NOT NULL,
    "programmeName" character varying(50) NOT NULL,
    "scheduleIds" integer[],
    "hashedPassword" character varying(100) DEFAULT 'password'::character varying
);


ALTER TABLE public.programme OWNER TO test_user;

--
-- Name: programme_programmeId_seq; Type: SEQUENCE; Schema: public; Owner: test_user
--

CREATE SEQUENCE public."programme_programmeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."programme_programmeId_seq" OWNER TO test_user;

--
-- Name: programme_programmeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test_user
--

ALTER SEQUENCE public."programme_programmeId_seq" OWNED BY public.programme."programmeId";


--
-- Name: programme_schedule; Type: TABLE; Schema: public; Owner: test_user
--

CREATE TABLE public.programme_schedule (
    "programmeId" integer NOT NULL,
    "scheduleId" integer NOT NULL
);


ALTER TABLE public.programme_schedule OWNER TO test_user;

--
-- Name: rep_max; Type: TABLE; Schema: public; Owner: test_user
--

CREATE TABLE public.rep_max (
    "repMax" character varying(3) NOT NULL
);


ALTER TABLE public.rep_max OWNER TO test_user;

--
-- Name: schedule; Type: TABLE; Schema: public; Owner: test_user
--

CREATE TABLE public.schedule (
    "scheduleId" integer NOT NULL,
    "scheduleName" character varying(50) NOT NULL,
    "weekCount" integer NOT NULL,
    timetable text[]
);


ALTER TABLE public.schedule OWNER TO test_user;

--
-- Name: schedule_scheduleId_seq; Type: SEQUENCE; Schema: public; Owner: test_user
--

CREATE SEQUENCE public."schedule_scheduleId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."schedule_scheduleId_seq" OWNER TO test_user;

--
-- Name: schedule_scheduleId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test_user
--

ALTER SEQUENCE public."schedule_scheduleId_seq" OWNED BY public.schedule."scheduleId";


--
-- Name: instructor instructorId; Type: DEFAULT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.instructor ALTER COLUMN "instructorId" SET DEFAULT nextval('public."instructor_instructorId_seq"'::regclass);


--
-- Name: learner learnerId; Type: DEFAULT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.learner ALTER COLUMN "learnerId" SET DEFAULT nextval('public."learner_learnerId_seq"'::regclass);


--
-- Name: practice_bests pbId; Type: DEFAULT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.practice_bests ALTER COLUMN "pbId" SET DEFAULT nextval('public."practice_bests_pbId_seq"'::regclass);


--
-- Name: programme programmeId; Type: DEFAULT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.programme ALTER COLUMN "programmeId" SET DEFAULT nextval('public."programme_programmeId_seq"'::regclass);


--
-- Name: schedule scheduleId; Type: DEFAULT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.schedule ALTER COLUMN "scheduleId" SET DEFAULT nextval('public."schedule_scheduleId_seq"'::regclass);


--
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: test_user
--

COPY public.exercise ("exerciseName") FROM stdin;
snatch
clean and jerk
clean
split jerk
comp snatch
comp clean and jerk
comp total
power snatch
power clean
power jerk
push press
back squat
front squat
overhead squat
hang snatch
hang clean
block snatch
block clean
muscle snatch
strict press
snatch balance
snatch pull
clean pull
snatch deadlift
clean deadlift
pushups
pull-ups
dips
\.


--
-- Data for Name: instructor; Type: TABLE DATA; Schema: public; Owner: test_user
--

COPY public.instructor ("instructorId", email, "hashedPassword") FROM stdin;
3	admin@admin.com	$2b$10$CMDX90GP7gt46H9d0pxGm.6M4x2Ivf2TpV2f35san1ykif4RYOfzO
\.


--
-- Data for Name: learner; Type: TABLE DATA; Schema: public; Owner: test_user
--

COPY public.learner ("learnerId", "firstName", "lastName", email, snatch, clean, jerk, "cleanAndJerk", "backSquat", "frontSquat", "pushPress", "programmeId", username) FROM stdin;
50	Luke	Evans	Evansl@taieri.school.nz	65.00	85.00	85.00	85.00	120.00	105.00	70.00	1	evansl
67	Kiri	Calvert	kiri.calvert@live.com	42.00	55.00	55.00	55.00	105.00	80.00	50.00	1	calvertk
171	poppy	kirk	pbkirk16@gmail.com	0.00	0.00	0.00	0.00	0.00	0.00	0.00	1	kirkp
45	Kieran	Mcgovern	Kieranmcgovern15@gmail.com	110.00	150.00	150.00	150.00	220.00	190.00	123.00	1	mcgovernk
66	Patrick	Cloughley	patricksefocloughley11@gmail.com	120.00	150.00	150.00	150.00	190.00	160.00	120.00	1	cloughleyp
172	cole	jones	jonescoleza@gmail.com	50.00	70.00	60.00	65.00	100.00	80.00	50.00	1	jonesc
64	Lochlan	Webb	Lochlanroganwebb04@gmail.com	73.00	90.00	90.00	90.00	115.00	101.00	76.00	1	webbl
135	luka	homersham	lukahomersham@gmail.com	80.00	101.00	101.00	101.00	140.00	110.00	81.00	1	homershaml
131	owen	webb	knight1234567890123@hotmail.com	100.00	120.00	125.00	115.00	170.00	140.00	100.00	1	webbo
62	Oliver	Rohtmets	Dicksono@kavanagh.school.nz	36.00	55.00	48.00	48.00	65.00	50.00	33.00	1	rohtmetso
58	Taylor	Hamilton	Taylor.4.hamilton@gmail.com	36.00	54.00	50.00	50.00	70.00	57.00	43.00	1	hamiltont
63	Torin	Webb	torinjaredwebb@gmail.com	80.00	100.00	100.00	100.00	130.00	115.00	80.00	1	webbt
207	karun	varma	karun77@gmail.com	0.00	0.00	0.00	0.00	0.00	0.00	0.00	6	varmak
1	thang	pham	thangnus@gmail.com	120.45	120.00	120.00	120.00	120.00	120.00	110.00	1	phamt
46	Callan	Helms	callanhelms@gmail.com	120.00	150.00	161.00	150.00	210.00	180.00	136.00	1	helmsc
57	Kelly	Hoyt	kelly.jt.hoyt@gmail.com	43.00	55.00	53.00	53.00	70.00	61.00	40.00	1	hoytk
88	Luka	Homersham	Lukahomersham@gmail.com	0.00	0.00	0.00	0.00	0.00	0.00	0.00	1	homershaml
61	Owen	Webb	webboh@outlook.co.nz	0.00	0.00	0.00	0.00	0.00	0.00	0.00	1	webbo
51	Brock	Stewart	Brockstewart2017@gmail.com	55.00	67.00	65.00	65.00	90.00	78.00	55.00	1	stewartb
52	Flook	Chinsaswat	flookchinsaswat@gmail.com	70.00	100.00	95.00	95.00	140.00	120.00	62.00	1	chinsaswatf
56	Emily	Perry	emilyjanep2001@gmail.com	0.00	0.00	0.00	0.00	0.00	0.00	0.00	1	perrye
208	learner	learner	learner@learner.com	0.00	0.00	0.00	0.00	0.00	0.00	0.00	1	learnerl
\.


--
-- Data for Name: practice_bests; Type: TABLE DATA; Schema: public; Owner: test_user
--

COPY public.practice_bests ("pbId", "learnerId", "exerciseName", "repMax", weight, "lastEdited") FROM stdin;
3	1	clean	x7	100.00	2020-10-20
4	1	clean	x8	100.00	2020-10-15
10	1	snatch	x5	120.00	2020-10-23
13	1	snatch	x10	120.00	2020-10-23
11	1	clean and jerk	x3	97.00	2020-10-23
21	1	clean and jerk	x4	120.00	2020-10-24
23	1	clean and jerk	x10	100.00	2020-10-24
24	1	clean and jerk	x7	100.00	2020-10-24
27	1	snatch	x7	100.00	2020-10-24
28	1	clean and jerk	x6	100.00	2020-10-24
29	1	clean and jerk	x3	100.00	2020-10-24
30	1	clean	x1	120.45	2020-10-25
8	1	clean and jerk	x8	120.45	2020-10-25
7	1	clean and jerk	x7	120.45	2020-10-25
31	1	clean	x1	100.00	2020-10-25
32	1	split jerk	x1	100.00	2020-10-25
33	46	snatch	x3	100.00	2020-10-25
34	46	split jerk	x2	140.00	2020-10-25
35	46	split jerk	x6	150.00	2020-10-25
36	46	split jerk	x2	145.00	2020-10-25
37	66	snatch	x1	120.00	2020-10-26
38	45	pull-ups	x8	25.00	2020-10-26
40	58	comp snatch	x1	31.00	2020-10-26
41	45	snatch	x2	100.00	2020-10-26
42	58	comp clean and jerk	x1	45.00	2020-10-26
43	58	power snatch	x2	34.00	2020-10-26
44	58	back squat	x1	65.00	2020-10-26
39	45	snatch	x1	110.00	2020-10-26
46	1	snatch	x9	75.00	2020-10-26
47	1	snatch	x5	100.00	2020-10-26
49	58	power clean	x1	44.00	2020-11-01
50	58	comp total	x1	76.00	2020-11-01
51	62	power clean	x1	50.00	2020-11-06
52	58	snatch	x1	35.00	2020-11-06
53	58	clean and jerk	x1	47.00	2020-11-06
54	58	power snatch	x1	35.00	2020-11-06
55	58	back squat	x1	70.00	2020-11-06
56	58	clean deadlift	x3	80.00	2020-11-06
57	58	clean deadlift	x1	90.00	2020-11-06
58	58	muscle snatch	x2	27.00	2020-11-06
59	58	push press	x1	43.00	2020-11-06
14	1	snatch	x4	95.75	2020-12-05
60	58	snatch	x3	34.00	2020-12-14
61	58	snatch	x1	36.00	2020-12-14
62	58	block snatch	x3	34.00	2020-12-14
63	58	block snatch	x1	36.00	2020-12-14
64	58	pull-ups	x3	62.00	2020-12-14
65	58	strict press	x8	27.00	2020-12-14
66	58	block clean	x3	47.00	2020-12-16
67	58	block clean	x1	54.00	2020-12-16
\.


--
-- Data for Name: programme; Type: TABLE DATA; Schema: public; Owner: test_user
--

COPY public.programme ("programmeId", "programmeName", "scheduleIds", "hashedPassword") FROM stdin;
1	Youth and Junior	{6}	$2b$10$KXk7Xky81chsVl0hL8mRKupRZmk3bQqOxqFSYmOgikxe7.LcSqGf.
5	Senior	\N	$2b$10$3nMm4G9.IA7Bxb1v6ACHWulTn0NSRxdf20ezUJprm0NKf0Jd0a5oG
6	testing	\N	password
\.


--
-- Data for Name: programme_schedule; Type: TABLE DATA; Schema: public; Owner: test_user
--

COPY public.programme_schedule ("programmeId", "scheduleId") FROM stdin;
1	138
\.


--
-- Data for Name: rep_max; Type: TABLE DATA; Schema: public; Owner: test_user
--

COPY public.rep_max ("repMax") FROM stdin;
x1
x2
x3
x4
x5
x6
x7
x8
x9
x10
\.


--
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: test_user
--

COPY public.schedule ("scheduleId", "scheduleName", "weekCount", timetable) FROM stdin;
137	Youth Junior Hypertrophy Training Nov-Dec 2020	5	{"{\\"day 1\\":[{\\"exerciseName\\":\\"Block Snatch\\",\\"instruction\\":\\"65% 3r3s\\"},{\\"exerciseName\\":\\"Strict Press\\",\\"instruction\\":\\"RPE6 8r2s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"60% 8r2s\\"},{\\"exerciseName\\":\\"Pullups or Cable Row\\",\\"instruction\\":\\"4RIR3s or RPE6 10r3s\\"},{\\"exerciseName\\":\\"Situps on Roman Chair or Hanging knee/leg raise\\",\\"instruction\\":\\"4RIR3s or RPE6 10r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"55% 3r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"55% 2r3s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE6 10r2s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Block Clean\\",\\"instruction\\":\\"65% 3r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"60% 6r2s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"80% 6r2s\\"},{\\"exerciseName\\":\\"Bulgarian Split Squat\\",\\"instruction\\":\\"RPE6 8r2s\\"},{\\"exerciseName\\":\\"Bent Over Barbell Row\\",\\"instruction\\":\\"RPE6 10r2s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE6 10r2s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"60% 3r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"65% 3r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"65% 5r2s\\"},{\\"exerciseName\\":\\"Snatch Romanian Deadlift\\",\\"instruction\\":\\"65% 8r2s\\"},{\\"exerciseName\\":\\"Barbell Bicep Curl\\",\\"instruction\\":\\"RPE6 10r2s\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Block Snatch\\",\\"instruction\\":\\"70% 3r3s\\"},{\\"exerciseName\\":\\"Strict Press\\",\\"instruction\\":\\"RPE7 8r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"65% 8r3s\\"},{\\"exerciseName\\":\\"Pullups or Cable Row\\",\\"instruction\\":\\"3RIR4s or RPE7 10r4s\\"},{\\"exerciseName\\":\\"Situps on Roman Chair or Hanging knee/leg raise\\",\\"instruction\\":\\"3RIR3s or RPE7 10r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"58% 3r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"60% 2r3s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE6 10r2s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Block Clean\\",\\"instruction\\":\\"70% 3r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"65% 6r3s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"85% 6r3s\\"},{\\"exerciseName\\":\\"Bulgarian Split Squat\\",\\"instruction\\":\\"RPE7 8r2s\\"},{\\"exerciseName\\":\\"Bent Over Barbell Row\\",\\"instruction\\":\\"RPE7 10r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE7 10r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"65% 3r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"70% 3r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"70% 5r3s\\"},{\\"exerciseName\\":\\"Snatch Romanian Deadlift\\",\\"instruction\\":\\"70% 8r2s\\"},{\\"exerciseName\\":\\"Barbell Bicep Curl\\",\\"instruction\\":\\"RPE7 10r3s\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Block Snatch\\",\\"instruction\\":\\"73% 3r4s\\"},{\\"exerciseName\\":\\"Strict Press\\",\\"instruction\\":\\"RPE8 8r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"70% 8r3s\\"},{\\"exerciseName\\":\\"Pullups or Cable Row\\",\\"instruction\\":\\"2RIR4s or RPE8 10r4s\\"},{\\"exerciseName\\":\\"Situps on Roman Chair or Hanging knee/leg raise\\",\\"instruction\\":\\"2RIR4s or RPE8 10r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"61% 3r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"65% 2r3s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE7 10r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Block Clean\\",\\"instruction\\":\\"73% 3r4s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"68% 6r4s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"90% 6r3s\\"},{\\"exerciseName\\":\\"Bulgarian Split Squat\\",\\"instruction\\":\\"RPE8 8r3s\\"},{\\"exerciseName\\":\\"Bent Over Barbell Row\\",\\"instruction\\":\\"RPE8 10r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE7 10r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"70% 3r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"75% 3r4s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"75% 5r3s\\"},{\\"exerciseName\\":\\"Snatch Romanian Deadlift\\",\\"instruction\\":\\"75% 8r3s\\"},{\\"exerciseName\\":\\"Barbell Bicep Curl\\",\\"instruction\\":\\"RPE8 10r3s\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Block Snatch\\",\\"instruction\\":\\"76% 3r4s\\"},{\\"exerciseName\\":\\"Strict Press\\",\\"instruction\\":\\"RPE8-9 8r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"75% 8r1s, 71% 8r2s\\"},{\\"exerciseName\\":\\"Pullups or Cable Row\\",\\"instruction\\":\\"1RIR5s or RPE9 10r4s\\"},{\\"exerciseName\\":\\"Situps on Roman Chair or Hanging knee/leg raise\\",\\"instruction\\":\\"1RIR5s or RPE9 10r4s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"64% 3r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"70% 2r3s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE8 10r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Block Clean\\",\\"instruction\\":\\"76% 3r4s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"71% 6r4s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"95% 6r3s\\"},{\\"exerciseName\\":\\"Bulgarian Split Squat\\",\\"instruction\\":\\"RPE9 8r3s\\"},{\\"exerciseName\\":\\"Bent Over Barbell Row\\",\\"instruction\\":\\"RPE9 10r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE8 10r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"72% 3r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"78% 3r4s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"78% 5r3s\\"},{\\"exerciseName\\":\\"Snatch Romanian Deadlift\\",\\"instruction\\":\\"80% 8r3s\\"},{\\"exerciseName\\":\\"Barbell Bicep Curl\\",\\"instruction\\":\\"RPE9 10r4s\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Block Snatch\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Strict Press\\",\\"instruction\\":\\"8RM, RPE8 8r2s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"8RM, 73% 8r2s\\"},{\\"exerciseName\\":\\"Pullups or Cable Row\\",\\"instruction\\":\\"0RIR1s or RPE10 10r1s\\"},{\\"exerciseName\\":\\"Situps on Roman Chair or Hanging knee/leg raise\\",\\"instruction\\":\\"0RIR1s or RPE10 10r1s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"55% 3r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"65% 2r3s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE9 10r2s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Block Clean\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"6RM\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"100% 6r3s\\"},{\\"exerciseName\\":\\"Bulgarian Split Squat\\",\\"instruction\\":\\"RPE9 8r4s\\"},{\\"exerciseName\\":\\"Bent Over Barbell Row\\",\\"instruction\\":\\"RPE10 10r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE9 10r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"75% 3r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"81% 5r2s\\"},{\\"exerciseName\\":\\"Snatch Romanian Deadlift\\",\\"instruction\\":\\"85% 8r2s\\"},{\\"exerciseName\\":\\"Barbell Bicep Curl\\",\\"instruction\\":\\"RPE10 10r3s\\"}]}"}
138	Youth/Junior Hypertrophy Jan 2021	5	{"{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"68% 3r3s\\"},{\\"exerciseName\\":\\"Strict Press\\",\\"instruction\\":\\"RPE6 10r2s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"60% 10r2s\\"},{\\"exerciseName\\":\\"Pullups or Cable Row\\",\\"instruction\\":\\"4RIR3s or RPE6 8r3s\\"},{\\"exerciseName\\":\\"Situps on Roman Chair or Hanging knee/leg raise\\",\\"instruction\\":\\"4RIR3s or RPE6 8r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"55% 2r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"55% 3r3s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE6 10r2s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean\\",\\"instruction\\":\\"68% 3r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"65% 4r2s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"85% 4r2s\\"},{\\"exerciseName\\":\\"Clean Deadlift\\",\\"instruction\\":\\"80% 8r2s\\"},{\\"exerciseName\\":\\"Bent Over Barbell Row\\",\\"instruction\\":\\"RPE6 8r2s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE6 8r2s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"65% 2r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"70% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"70% 4r2s\\"},{\\"exerciseName\\":\\"Good Morning\\",\\"instruction\\":\\"RPE6 6r2s\\"},{\\"exerciseName\\":\\"Dips/Pushups\\",\\"instruction\\":\\"RPE6 8r2s or 4RIR3s\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"73% 3r3s\\"},{\\"exerciseName\\":\\"Strict Press\\",\\"instruction\\":\\"RPE7 10r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"65% 10r3s\\"},{\\"exerciseName\\":\\"Pullups or Cable Row\\",\\"instruction\\":\\"3RIR3s or RPE7 8r3s\\"},{\\"exerciseName\\":\\"Situps on Roman Chair or Hanging knee/leg raise\\",\\"instruction\\":\\"3RIR3s or RPE7 8r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"58% 2r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"60% 3r3s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE7 10r2s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean\\",\\"instruction\\":\\"73% 3r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"70% 4r3s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"90% 4r3s\\"},{\\"exerciseName\\":\\"Clean Deadlift\\",\\"instruction\\":\\"90% 8r2s\\"},{\\"exerciseName\\":\\"Bent Over Barbell Row\\",\\"instruction\\":\\"RPE7 8r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE7 8r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"68% 2r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"75% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"73% 4r3s\\"},{\\"exerciseName\\":\\"Good Morning\\",\\"instruction\\":\\"RPE7 6r3s\\"},{\\"exerciseName\\":\\"Dips/Pushups\\",\\"instruction\\":\\"RPE7 8r3s or 3RIR3s\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"78% 3r4s\\"},{\\"exerciseName\\":\\"Strict Press\\",\\"instruction\\":\\"RPE8 10r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"70% 10r1s, 66% 10r2s\\"},{\\"exerciseName\\":\\"Pullups or Cable Row\\",\\"instruction\\":\\"2RIR4s or RPE8 8r3s\\"},{\\"exerciseName\\":\\"Situps on Roman Chair or Hanging knee/leg raise\\",\\"instruction\\":\\"2RIR4s or RPE8 8r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"61% 2r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"65% 3r3s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE8 10r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean\\",\\"instruction\\":\\"78% 3r4s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"75% 4r1s, 71% 4r2s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"95% 4r3s\\"},{\\"exerciseName\\":\\"Clean Deadlift\\",\\"instruction\\":\\"95% 8r2s\\"},{\\"exerciseName\\":\\"Bent Over Barbell Row\\",\\"instruction\\":\\"RPE8 8r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE8 8r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"71% 2r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"80% 2r4s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"80% 4r1s, 75% 4r2s\\"},{\\"exerciseName\\":\\"Good Morning\\",\\"instruction\\":\\"RPE8 6r3s\\"},{\\"exerciseName\\":\\"Dips/Pushups\\",\\"instruction\\":\\"RPE8 8r4s or 2RIR4s\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Strict Press\\",\\"instruction\\":\\"RPE10 10r1s, RPE9 10r1s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"10RM\\"},{\\"exerciseName\\":\\"Pullups or Cable Row\\",\\"instruction\\":\\"1RIR4s or RPE9 8r3s\\"},{\\"exerciseName\\":\\"Situps on Roman Chair or Hanging knee/leg raise\\",\\"instruction\\":\\"1RIR4s or RPE9 8r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"65% 2r1-2s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"70% 3r2s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE9 10r2s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"4RM\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"100% 4r2s\\"},{\\"exerciseName\\":\\"Clean Deadlift\\",\\"instruction\\":\\"100% 8r1s\\"},{\\"exerciseName\\":\\"Bent Over Barbell Row\\",\\"instruction\\":\\"RPE9 8r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE9 8r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"2RM\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"2RM\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"4RM\\"},{\\"exerciseName\\":\\"Good Morning\\",\\"instruction\\":\\"RPE9 6r2s\\"},{\\"exerciseName\\":\\"Dips/Pushups\\",\\"instruction\\":\\"RPE9 8r2s or 1RIR2s\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"68% 2r3s\\"},{\\"exerciseName\\":\\"Strict Press\\",\\"instruction\\":\\"RPE5 8r2s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"55% 8r2s\\"},{\\"exerciseName\\":\\"Pullups or Cable Row\\",\\"instruction\\":\\"5RIR2s or RPE5 8r2s\\"},{\\"exerciseName\\":\\"Situps on Roman Chair or Hanging knee/leg raise\\",\\"instruction\\":\\"5RIR2s or RPE5 8r2s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"55% 2r2s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"60% 2r2s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE5 10r2s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean\\",\\"instruction\\":\\"60% 1r4s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"60% 3r3s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"80% 3r2s\\"},{\\"exerciseName\\":\\"Clean Deadlift\\",\\"instruction\\":\\"80% 6r2s\\"},{\\"exerciseName\\":\\"Bent Over Barbell Row\\",\\"instruction\\":\\"RPE5 8r2s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE5 8r2s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"50% 2r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"60% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"65% 3r2s\\"},{\\"exerciseName\\":\\"Good Morning\\",\\"instruction\\":\\"RPE5 4r2s\\"},{\\"exerciseName\\":\\"Dips/Pushups\\",\\"instruction\\":\\"RPE5 6r2s or 5RIR2s\\"}]}"}
\.


--
-- Name: instructor_instructorId_seq; Type: SEQUENCE SET; Schema: public; Owner: test_user
--

SELECT pg_catalog.setval('public."instructor_instructorId_seq"', 3, true);


--
-- Name: learner_learnerId_seq; Type: SEQUENCE SET; Schema: public; Owner: test_user
--

SELECT pg_catalog.setval('public."learner_learnerId_seq"', 209, true);


--
-- Name: practice_bests_pbId_seq; Type: SEQUENCE SET; Schema: public; Owner: test_user
--

SELECT pg_catalog.setval('public."practice_bests_pbId_seq"', 67, true);


--
-- Name: programme_programmeId_seq; Type: SEQUENCE SET; Schema: public; Owner: test_user
--

SELECT pg_catalog.setval('public."programme_programmeId_seq"', 6, true);


--
-- Name: schedule_scheduleId_seq; Type: SEQUENCE SET; Schema: public; Owner: test_user
--

SELECT pg_catalog.setval('public."schedule_scheduleId_seq"', 138, true);


--
-- Name: exercise exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY ("exerciseName");


--
-- Name: instructor instructor_email_key; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.instructor
    ADD CONSTRAINT instructor_email_key UNIQUE (email);


--
-- Name: instructor instructor_pkey; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.instructor
    ADD CONSTRAINT instructor_pkey PRIMARY KEY ("instructorId");


--
-- Name: learner learner_pkey; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.learner
    ADD CONSTRAINT learner_pkey PRIMARY KEY ("learnerId");


--
-- Name: practice_bests practice_bests_pkey; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.practice_bests
    ADD CONSTRAINT practice_bests_pkey PRIMARY KEY ("pbId");


--
-- Name: programme programme_pkey; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.programme
    ADD CONSTRAINT programme_pkey PRIMARY KEY ("programmeId");


--
-- Name: programme_schedule programme_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.programme_schedule
    ADD CONSTRAINT programme_schedule_pkey PRIMARY KEY ("scheduleId", "programmeId");


--
-- Name: rep_max rep_max_pkey; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.rep_max
    ADD CONSTRAINT rep_max_pkey PRIMARY KEY ("repMax");


--
-- Name: schedule schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_pkey PRIMARY KEY ("scheduleId");


--
-- Name: learner unique_email; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.learner
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: learner learner_programmeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.learner
    ADD CONSTRAINT "learner_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES public.programme("programmeId") ON DELETE SET NULL;


--
-- Name: practice_bests practice_bests_exerciseName_fkey; Type: FK CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.practice_bests
    ADD CONSTRAINT "practice_bests_exerciseName_fkey" FOREIGN KEY ("exerciseName") REFERENCES public.exercise("exerciseName") ON DELETE CASCADE;


--
-- Name: practice_bests practice_bests_learnerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.practice_bests
    ADD CONSTRAINT "practice_bests_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES public.learner("learnerId") ON DELETE CASCADE;


--
-- Name: practice_bests practice_bests_repMax_fkey; Type: FK CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.practice_bests
    ADD CONSTRAINT "practice_bests_repMax_fkey" FOREIGN KEY ("repMax") REFERENCES public.rep_max("repMax") ON DELETE CASCADE;


--
-- Name: programme_schedule programme_schedule_programmeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.programme_schedule
    ADD CONSTRAINT "programme_schedule_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES public.programme("programmeId") ON DELETE CASCADE;


--
-- Name: programme_schedule programme_schedule_scheduleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.programme_schedule
    ADD CONSTRAINT "programme_schedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES public.schedule("scheduleId") ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

