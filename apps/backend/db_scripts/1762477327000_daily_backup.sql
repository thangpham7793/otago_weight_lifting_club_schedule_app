--
-- PostgreSQL database dump
--

\restrict f4bBfZ6lH7McaijOKNgc3hMo9gEMJAe2evypVsdV8c5QKQdpdxAti5NULeVzNgr

-- Dumped from database version 14.6 (Debian 14.6-1.pgdg110+1)
-- Dumped by pg_dump version 16.10 (Ubuntu 16.10-1.pgdg24.04+1)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: instructor_login(text); Type: FUNCTION; Schema: public; Owner: -
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


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: exercise; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.exercise (
    "exerciseName" character varying(50) NOT NULL
);


--
-- Name: instructor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.instructor (
    "instructorId" integer NOT NULL,
    email character varying(50) NOT NULL,
    "hashedPassword" character varying(150) NOT NULL
);


--
-- Name: instructor_instructorId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."instructor_instructorId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: instructor_instructorId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."instructor_instructorId_seq" OWNED BY public.instructor."instructorId";


--
-- Name: learner; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: learner_learnerId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."learner_learnerId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: learner_learnerId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."learner_learnerId_seq" OWNED BY public.learner."learnerId";


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    name character varying(50) NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: practice_bests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.practice_bests (
    "pbId" integer NOT NULL,
    "learnerId" integer NOT NULL,
    "exerciseName" character varying(50) NOT NULL,
    "repMax" character varying(3) NOT NULL,
    weight numeric(5,2) DEFAULT 0 NOT NULL,
    "lastEdited" date DEFAULT CURRENT_DATE NOT NULL
);


--
-- Name: practice_bests_pbId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."practice_bests_pbId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: practice_bests_pbId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."practice_bests_pbId_seq" OWNED BY public.practice_bests."pbId";


--
-- Name: programme; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.programme (
    "programmeId" integer NOT NULL,
    "programmeName" character varying(50) NOT NULL,
    "scheduleIds" integer[],
    "hashedPassword" character varying(100) DEFAULT 'password'::character varying
);


--
-- Name: programme_programmeId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."programme_programmeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: programme_programmeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."programme_programmeId_seq" OWNED BY public.programme."programmeId";


--
-- Name: programme_schedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.programme_schedule (
    "programmeId" integer NOT NULL,
    "scheduleId" integer NOT NULL
);


--
-- Name: rep_max; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rep_max (
    "repMax" character varying(3) NOT NULL
);


--
-- Name: schedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schedule (
    "scheduleId" integer NOT NULL,
    "scheduleName" character varying(50) NOT NULL,
    "weekCount" integer NOT NULL,
    timetable text[]
);


--
-- Name: schedule_scheduleId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."schedule_scheduleId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: schedule_scheduleId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."schedule_scheduleId_seq" OWNED BY public.schedule."scheduleId";


--
-- Name: instructor instructorId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.instructor ALTER COLUMN "instructorId" SET DEFAULT nextval('public."instructor_instructorId_seq"'::regclass);


--
-- Name: learner learnerId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.learner ALTER COLUMN "learnerId" SET DEFAULT nextval('public."learner_learnerId_seq"'::regclass);


--
-- Name: practice_bests pbId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.practice_bests ALTER COLUMN "pbId" SET DEFAULT nextval('public."practice_bests_pbId_seq"'::regclass);


--
-- Name: programme programmeId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programme ALTER COLUMN "programmeId" SET DEFAULT nextval('public."programme_programmeId_seq"'::regclass);


--
-- Name: schedule scheduleId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedule ALTER COLUMN "scheduleId" SET DEFAULT nextval('public."schedule_scheduleId_seq"'::regclass);


--
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: -
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
-- Data for Name: instructor; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.instructor ("instructorId", email, "hashedPassword") FROM stdin;
1	callanhelms@gmail.com	e558a79365dc168fa75699046d31abbf9b9031a94a531067b092cfeb052b3b372ff2a11239aee301e2cc348b0f5d3f74
2	thangnus@gmail.com	e558a79365dc168fa75699046d31abbf9b9031a94a531067b092cfeb052b3b372ff2a11239aee301e2cc348b0f5d3f74
\.


--
-- Data for Name: learner; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.learner ("learnerId", "firstName", "lastName", email, snatch, clean, jerk, "cleanAndJerk", "backSquat", "frontSquat", "pushPress", "programmeId", username) FROM stdin;
45	Kieran	Mcgovern	Kieranmcgovern15@gmail.com	127.00	173.00	185.00	173.00	245.00	215.00	143.00	1	mcgovernk
61	Owen	Webb	webboh@outlook.co.nz	101.00	130.00	130.00	130.00	171.00	140.00	105.00	1	webbo
207	karun	varma	karun77@gmail.com	0.00	0.00	0.00	0.00	0.00	0.00	0.00	\N	varmak
50	Luke	Evans	Evansl@taieri.school.nz	80.00	100.00	100.00	100.00	130.00	115.00	70.00	1	evansl
223	amorangi	rayner	arayner621@gmail.com	55.00	60.00	60.00	60.00	70.00	65.00	50.00	1	raynera
57	Kelly	Hoyt	kelly.jt.hoyt@gmail.com	45.00	55.00	53.00	53.00	70.00	61.00	40.00	1	hoytk
212	toby	evans	evanstoby23@gmail.com	80.00	115.00	115.00	110.00	140.00	125.00	90.00	1	evanst
67	Kiri	Calvert	kiri.calvert@live.com	60.00	75.00	80.00	75.00	140.00	105.00	65.00	1	calvertk
231	ryan	evans	leannee@xtra.co.nz	90.00	110.00	105.00	105.00	140.00	115.00	0.00	1	evansr
63	Torin	Webb	torinjaredwebb@gmail.com	83.00	100.00	102.00	101.00	130.00	120.00	80.00	1	webbt
214	ryan	evans	ryangraemeevans@gmail.com	75.00	90.00	90.00	85.00	100.00	0.00	0.00	1	evansr
56	Emily	Perry	emilyjanep2001@gmail.com	48.00	52.00	52.00	52.00	65.00	56.00	35.00	1	perrye
229	luke	evans	lukeye02@gmail.com	0.00	0.00	0.00	0.00	0.00	0.00	0.00	1	evansl
131	owen	webb	knight1234567890123@hotmail.com	101.00	130.00	130.00	130.00	171.00	140.00	105.00	1	webbo
51	Brock	Stewart	Brockstewart2017@gmail.com	55.00	67.00	65.00	65.00	90.00	78.00	55.00	1	stewartb
64	Lochlan	Webb	Lochlanroganwebb04@gmail.com	82.00	108.00	100.00	100.00	125.00	115.00	83.00	1	webbl
226	carmi	oosthuizen	carmi.oosthuizen@gmail.com	58.00	75.00	71.50	74.00	95.00	75.00	50.00	1	oosthuizenc
232	lochlan rogan	webb	lochlanroganwebb04@gmail.com	0.00	0.00	0.00	0.00	0.00	0.00	0.00	1	webbl
1	thang	pham	thangnus@gmail.com	120.45	120.00	234.00	120.00	120.00	120.00	110.00	1	phamt
233	test	guy	zeldascott55@gmail.com	20.00	50.00	60.00	70.00	90.00	100.00	60.00	1	guyt
224	jeremy	manteiga	jeremymanteiga@gmail.com	98.00	120.00	120.00	120.00	165.00	140.00	95.00	1	manteigaj
172	cole	jones	jonescoleza@gmail.com	84.00	105.00	113.00	101.00	120.00	110.00	95.00	1	jonesc
62	Oliver	Rohtmets	Dicksono@kavanagh.school.nz	88.00	116.00	102.00	102.00	140.00	120.00	90.00	1	rohtmetso
227	miandi	oosthuizen	miandi0508@gmail.com	75.00	92.50	92.60	92.50	120.00	96.00	70.00	1	oosthuizenm
171	poppy	kirk	pbkirk16@gmail.com	60.00	72.00	76.00	71.00	100.00	80.00	57.00	1	kirkp
213	julian	harker	athyriel0@gmail.com	100.00	122.00	120.00	118.00	155.00	135.00	106.00	1	harkerj
52	Flook	Chinsaswat	flookchinsaswat@gmail.com	75.00	96.00	90.00	90.00	130.00	125.00	55.00	1	chinsaswatf
218	connell	webb	connelleaganwebb@gmail.com	78.00	105.00	105.00	105.00	120.00	110.00	70.00	1	webbc
235	ella	rowe	ellagymnastrowe@gmail.com	0.00	0.00	0.00	0.00	0.00	0.00	0.00	1	rowee
236	patrick nevareta	sefo-cloughley	patricksefocloughley@gmail.com	107.00	147.00	145.00	139.00	190.00	150.00	110.00	1	sefo-cloughleyp
225	jumari	oosthuizen	jumari.oosthuizen@gmail.com	72.00	93.00	93.00	93.00	120.00	103.00	68.00	1	oosthuizenj
219	john	zhao	johnzhao2612@gmail.com	90.00	120.00	110.00	120.00	200.00	180.00	85.00	1	zhaoj
221	johm	zhao	johnzhao2003@icloud.com	90.00	138.00	120.00	120.00	200.00	170.00	95.00	1	zhaoj
135	luka	homersham	lukahomersham@gmail.com	85.00	115.00	115.00	115.00	160.00	125.00	92.50	1	homershaml
66	Patrick	Cloughley	patricksefocloughley11@gmail.com	115.00	150.00	150.00	150.00	200.00	165.00	120.00	1	cloughleyp
215	flynn	cunningham-beentjes	flynn.c.b@icloud.com	71.00	100.00	95.00	90.00	137.00	110.00	85.00	1	cunningham-beentjesf
88	Luka	Homersham	Lukahomersham@gmail.com	85.00	110.00	110.00	110.00	160.00	0.00	0.00	1	homershaml
46	Callan	Helms	callanhelms@gmail.com	120.00	153.00	170.00	153.00	250.00	200.00	145.00	1	helmsc
58	Taylor	Hamilton	Taylor.4.hamilton@gmail.com	40.00	50.00	50.00	50.00	65.00	55.00	45.00	1	hamiltont
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (name, date) FROM stdin;
updatePasswordHashes	2022-11-13 11:39:36.655297
\.


--
-- Data for Name: practice_bests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.practice_bests ("pbId", "learnerId", "exerciseName", "repMax", weight, "lastEdited") FROM stdin;
3	1	clean	x7	100.00	2020-10-20
4	1	clean	x8	100.00	2020-10-15
97	63	snatch balance	x1	100.00	2021-03-16
98	63	snatch pull	x1	110.00	2021-03-16
99	63	clean pull	x1	120.00	2021-03-16
100	63	snatch deadlift	x1	115.00	2021-03-16
101	63	clean deadlift	x1	140.00	2021-03-16
102	52	comp snatch	x1	73.00	2021-04-04
10	1	snatch	x5	120.00	2020-10-23
13	1	snatch	x10	120.00	2020-10-23
11	1	clean and jerk	x3	97.00	2020-10-23
104	52	clean and jerk	x1	94.00	2021-04-04
105	52	comp clean and jerk	x1	94.00	2021-04-04
21	1	clean and jerk	x4	120.00	2020-10-24
23	1	clean and jerk	x10	100.00	2020-10-24
24	1	clean and jerk	x7	100.00	2020-10-24
27	1	snatch	x7	100.00	2020-10-24
28	1	clean and jerk	x6	100.00	2020-10-24
106	52	clean	x1	100.00	2021-04-04
29	1	clean and jerk	x3	100.00	2020-10-24
30	1	clean	x1	120.45	2020-10-25
8	1	clean and jerk	x8	120.45	2020-10-25
7	1	clean and jerk	x7	120.45	2020-10-25
31	1	clean	x1	100.00	2020-10-25
32	1	split jerk	x1	100.00	2020-10-25
107	213	push press	x1	86.00	2021-04-26
33	46	snatch	x3	100.00	2020-10-25
34	46	split jerk	x2	140.00	2020-10-25
35	46	split jerk	x6	150.00	2020-10-25
36	46	split jerk	x2	145.00	2020-10-25
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
68	213	snatch	x1	65.00	2021-02-18
69	213	clean and jerk	x1	85.00	2021-02-18
70	213	clean	x1	92.50	2021-02-18
71	213	split jerk	x1	85.00	2021-02-18
72	213	power snatch	x1	60.00	2021-02-18
73	213	power clean	x1	82.50	2021-02-18
74	213	power jerk	x1	80.00	2021-02-18
75	213	snatch	x1	68.00	2021-03-15
76	213	split jerk	x1	90.00	2021-03-15
77	63	front squat	x1	115.00	2021-03-16
78	63	clean	x1	100.00	2021-03-16
79	63	snatch	x1	80.00	2021-03-16
80	63	clean and jerk	x1	100.00	2021-03-16
81	63	split jerk	x1	100.00	2021-03-16
82	63	comp snatch	x1	75.00	2021-03-16
83	63	comp clean and jerk	x1	95.00	2021-03-16
84	63	comp total	x1	170.00	2021-03-16
85	63	power snatch	x1	70.00	2021-03-16
86	63	power clean	x1	90.00	2021-03-16
87	63	power jerk	x1	90.00	2021-03-16
88	63	push press	x1	80.00	2021-03-16
89	63	back squat	x1	130.00	2021-03-16
90	63	overhead squat	x1	100.00	2021-03-16
91	63	hang snatch	x1	80.00	2021-03-16
92	63	hang clean	x1	91.00	2021-03-16
93	63	muscle snatch	x1	53.00	2021-03-16
94	63	block snatch	x1	80.00	2021-03-16
95	63	block clean	x1	100.00	2021-03-16
96	63	strict press	x1	50.00	2021-03-16
108	213	snatch	x1	74.00	2021-04-30
109	213	clean and jerk	x1	100.00	2021-04-30
110	213	split jerk	x1	100.00	2021-04-30
111	213	power clean	x1	100.00	2021-04-30
112	213	power snatch	x1	70.00	2021-04-30
113	213	comp snatch	x1	74.00	2021-05-09
114	213	power jerk	x1	95.00	2021-05-09
115	58	snatch	x3	37.00	2021-06-01
116	58	snatch	x1	42.00	2021-06-01
117	58	split jerk	x2	50.00	2021-06-01
118	58	comp snatch	x1	38.00	2021-06-01
131	52	split jerk	x1	95.00	2021-12-11
103	52	snatch	x1	74.00	2021-06-07
119	52	clean deadlift	x1	160.00	2021-06-08
121	52	hang snatch	x2	65.00	2021-06-08
122	52	back squat	x1	140.00	2021-06-08
123	52	front squat	x1	130.00	2021-06-08
124	58	power clean	x1	53.00	2021-10-18
125	52	power clean	x1	100.00	2021-10-18
126	52	snatch	x1	77.00	2021-10-18
127	52	clean	x1	105.00	2021-10-18
128	52	split jerk	x1	94.00	2021-10-18
129	52	back squat	x1	142.00	2021-10-20
130	52	power snatch	x1	70.00	2021-10-20
132	52	comp snatch	x1	76.00	2021-12-11
133	218	clean deadlift	x1	150.00	2021-12-24
134	58	snatch	x3	42.00	2021-12-27
135	58	clean	x1	57.00	2022-01-01
136	58	comp total	x1	92.00	2022-01-01
137	58	comp clean and jerk	x1	53.00	2022-01-01
138	58	snatch	x1	45.00	2022-01-01
139	52	clean	x2	100.00	2022-02-03
142	58	overhead squat	x1	50.00	2022-03-10
143	131	snatch	x1	101.00	2022-04-25
144	131	snatch	x2	100.00	2022-04-25
145	131	clean and jerk	x1	130.00	2022-04-25
146	131	clean	x1	130.00	2022-04-25
147	131	comp clean and jerk	x1	119.00	2022-04-25
148	131	comp snatch	x1	96.00	2022-04-25
149	131	split jerk	x1	130.00	2022-04-25
150	131	comp total	x1	214.00	2022-04-25
151	131	power snatch	x1	90.00	2022-04-25
152	131	power clean	x1	116.00	2022-04-25
153	131	power jerk	x1	110.00	2022-04-25
154	131	push press	x1	110.00	2022-04-25
155	131	back squat	x1	171.00	2022-04-25
156	131	front squat	x1	140.00	2022-04-25
157	131	overhead squat	x1	120.00	2022-04-25
158	131	hang snatch	x1	100.00	2022-04-25
159	131	hang clean	x1	120.00	2022-04-25
160	131	block snatch	x1	100.00	2022-04-25
161	131	block clean	x1	120.00	2022-04-25
162	131	muscle snatch	x1	77.00	2022-04-25
163	131	strict press	x1	78.00	2022-04-25
164	131	snatch balance	x1	120.00	2022-04-25
165	131	clean deadlift	x1	190.00	2022-04-25
166	131	dips	x3	55.00	2022-04-25
167	226	front squat	x1	75.00	2022-05-22
168	58	split jerk	x2	55.00	2022-08-24
169	58	split jerk	x1	60.00	2022-08-24
170	58	clean and jerk	x1	55.00	2022-08-24
171	58	snatch	x1	49.00	2022-08-24
172	58	snatch	x2	45.00	2022-08-26
173	58	back squat	x1	75.00	2022-08-26
174	58	snatch balance	x1	55.00	2022-08-26
175	58	push press	x2	53.00	2022-08-26
176	58	push press	x3	50.00	2022-08-26
177	1	comp snatch	x1	100.00	2022-11-12
178	233	snatch	x1	100.00	2022-11-14
179	226	snatch	x1	60.00	2023-01-08
180	226	clean	x1	75.00	2023-01-08
181	226	clean and jerk	x1	74.00	2023-01-08
182	226	split jerk	x1	75.00	2023-01-08
183	226	back squat	x1	95.00	2023-01-08
184	226	front squat	x3	80.00	2023-01-08
185	226	snatch	x2	55.00	2023-02-05
186	226	snatch	x3	55.00	2023-02-05
187	226	clean and jerk	x2	70.00	2023-02-05
188	226	clean	x3	70.00	2023-02-05
189	226	back squat	x3	95.00	2023-03-13
190	226	split jerk	x3	75.00	2023-03-13
191	215	push press	x3	75.00	2023-03-15
37	66	snatch	x1	110.00	2023-04-04
192	66	clean and jerk	x1	145.00	2023-04-04
193	66	power snatch	x1	101.00	2023-04-04
194	66	clean	x1	150.00	2023-04-04
195	66	comp snatch	x1	104.00	2023-04-04
196	66	power clean	x1	130.00	2023-04-04
197	66	split jerk	x1	140.00	2023-04-04
198	236	comp snatch	x1	105.00	2023-04-04
199	236	split jerk	x1	140.00	2023-04-04
200	236	clean	x1	147.00	2023-04-04
201	236	clean and jerk	x1	146.00	2023-04-04
202	236	snatch	x1	110.00	2023-04-04
203	236	comp clean and jerk	x1	138.00	2023-04-04
204	236	power clean	x1	130.00	2023-04-04
205	236	comp total	x1	240.00	2023-04-04
206	236	power jerk	x1	137.00	2023-04-04
207	236	push press	x1	110.00	2023-04-04
208	236	back squat	x1	190.00	2023-04-04
209	236	front squat	x1	150.00	2023-04-04
210	171	snatch	x1	45.00	2023-05-17
211	171	clean and jerk	x1	65.00	2023-05-17
212	171	clean	x1	65.00	2023-05-17
213	171	split jerk	x1	70.00	2023-05-17
214	215	snatch	x2	60.00	2023-05-29
215	215	clean	x2	92.00	2023-05-31
216	215	push press	x3	78.00	2023-05-31
217	215	front squat	x3	95.00	2023-05-31
218	215	dips	x5	40.00	2023-06-02
219	215	clean pull	x3	125.00	2023-06-02
220	215	strict press	x1	69.00	2023-06-08
221	215	back squat	x8	100.00	2023-07-31
223	215	push press	x6	65.00	2023-08-02
224	215	push press	x4	68.00	2023-08-02
225	215	back squat	x5	110.00	2023-09-04
222	215	back squat	x1	120.00	2023-09-04
226	215	snatch	x3	61.00	2023-11-13
228	215	clean	x3	90.00	2023-11-15
229	215	power snatch	x1	70.00	2023-11-17
230	215	power snatch	x2	67.00	2023-11-17
231	215	power snatch	x3	64.00	2023-11-17
232	215	front squat	x4	100.00	2023-11-17
233	215	front squat	x3	105.00	2024-05-01
234	215	clean deadlift	x1	150.00	2024-05-03
235	215	back squat	x3	120.00	2024-05-03
237	215	dips	x3	40.00	2024-05-03
238	215	back squat	x10	105.00	2024-06-03
239	215	power snatch	x1	70.00	2024-09-09
240	52	hang snatch	x1	72.00	2025-10-12
241	52	hang clean	x1	90.00	2025-10-12
\.


--
-- Data for Name: programme; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.programme ("programmeId", "programmeName", "scheduleIds", "hashedPassword") FROM stdin;
1	Youth and Junior	{6}	03ee63e0c5cefbd07ad2d3d93f89849dc0079a350153c9bc515e83005676cc219de4f3e56dc1466ee6ab9283c4614509
\.


--
-- Data for Name: programme_schedule; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.programme_schedule ("programmeId", "scheduleId") FROM stdin;
1	204
1	207
1	209
1	212
1	214
\.


--
-- Data for Name: rep_max; Type: TABLE DATA; Schema: public; Owner: -
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
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.schedule ("scheduleId", "scheduleName", "weekCount", timetable) FROM stdin;
204	March Otago Champs 2025	4	{"{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"80% 1r5s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"80% 1r5s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"77% 3r4s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"3RIR3s or (RPE6 3r3s)\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE6 6r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"4r3s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"65% 5r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE6 6r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean\\",\\"instruction\\":\\"80% 1r5s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"77% 2r4s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"77% 2r4s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"100% 2r3s\\"},{\\"exerciseName\\":\\"Abs Weighted\\",\\"instruction\\":\\"RPE6 6r3s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"53% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE6 6r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE6 5r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"85% 1r4s\\"},{\\"exerciseName\\":\\"Clean and Jerk\\",\\"instruction\\":\\"83% 1r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"85% 2r1s, 80% 2r2s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"100% 2r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"4RIR3s or (RPE6 3r3s)\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"83% 1r5s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"83% 1r5s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"80% 3r4s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"3RIR3s or (RPE7 3r3s)\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE7 6r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"4r3s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"68% 5r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE7 6r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean\\",\\"instruction\\":\\"83% 1r5s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"80% 2r4s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"80% 2r4s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"100% 2r3s\\"},{\\"exerciseName\\":\\"Abs Weighted\\",\\"instruction\\":\\"RPE6 6r3s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"55% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE7 6r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE7 5r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"88% 1r4s\\"},{\\"exerciseName\\":\\"Clean and Jerk\\",\\"instruction\\":\\"86% 1r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"88% 2r1s, 83% 2r2s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"103% 2r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"3RIR3s or (RPE7 3r3s)\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"85% 1r5s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"85% 1r5s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"83% 3r4s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"2RIR3s or (RPE8 3r3s)\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE8 6r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"4r3s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"71% 5r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE8 6r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean\\",\\"instruction\\":\\"85% 1r5s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"83% 2r4s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"83% 2r4s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"103% 2r3s\\"},{\\"exerciseName\\":\\"Abs Weighted\\",\\"instruction\\":\\"RPE7 6r3s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"57% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE8 6r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE8 5r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"91% 1r4s\\"},{\\"exerciseName\\":\\"Clean and Jerk\\",\\"instruction\\":\\"88% 1r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"90% 2r1s, 86% 2r2s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"106% 2r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"2RIR3s or (RPE8 3r3s)\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"70% 1r4s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"70% 1r4s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"70% 4r3s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"5RIR2s or (RPE5 5r2s)\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE5 6r2s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"4r3s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"70% 4r2s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE5 6r2s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean\\",\\"instruction\\":\\"70% 1r4s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"65% 3r2s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"70% 3r2s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"90% 3r2s\\"},{\\"exerciseName\\":\\"Abs Weighted\\",\\"instruction\\":\\"RPE5 8r3s\\"}]}"}
207	May South Islands Cycle 2025	5	{"{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"80% 1r5s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"95% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"78% 2r3s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"4RIR3s/(RPE6 5r3s)\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE6 6r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"65% 4r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE6 5r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean + Jerk\\",\\"instruction\\":\\"80% 1r5s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"95% 2r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"78% 3r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"4RIR3s/(RPE6 5r3s)\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"55% 1r5s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE6 5r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE6 4r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"68% 1r5s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"68% 1r5s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"78% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"81% 1r5s\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE6\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"83% 1r5s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"100% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"81% 2r3s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"RPE7 6r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE7 6r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"68% 4r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE7 5r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean + Jerk\\",\\"instruction\\":\\"83% 1r5s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"98% 2r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"81% 3r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"3RIR3s/(RPE7 5r3s)\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"57% 1r5s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE7 5r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE7 4r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"71% 1r5s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"71% 1r5s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"81% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"84% 1r5s\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE7\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"86% 1r5s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"103% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"84% 2r3s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"RPE8 6r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE8 6r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"71% 4r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE8 5r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean + Jerk\\",\\"instruction\\":\\"86% 1r5s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"101% 2r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"84% 3r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"2RIR3s/(RPE8 5r3s)\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"59% 1r5s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE8 5r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE8 4r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"74% 1r5s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"74% 1r5s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"84% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"87% 1r5s\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE8\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"1RM\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"105% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"87% 2r3s or more\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"RPE9 6r2s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE9 6r2s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"74% 4r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE9 5r2s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean + Jerk\\",\\"instruction\\":\\"1RM\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"103% 2r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"87% 3r3s or more\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"1RIR2s/(RPE9 5r32)\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"50% 1r4s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE7 5r2s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE7 4r2s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"1RM\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"1RM\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"2RM\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"90% or more\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE7\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"80% 1r3s\\"},{\\"exerciseName\\":\\"Clean + Jerk\\",\\"instruction\\":\\"80% 1r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"80% 2r2s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"95% 2r2s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE5 6r2s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"65% 4r2s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE5 5r2s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"70% 1r4s\\"},{\\"exerciseName\\":\\"Power Clean + Split Jerk\\",\\"instruction\\":\\"70% 1r3s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"95% 2r2s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"75% 2r2s\\"}]}"}
209	June_July Hypertrophy 2025	5	{"{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"70% 3r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"70% 3r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"70% 6r3s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"4RIR3s/(RPE6 5r3s)\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE6 8r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"65% 8r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE6 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean\\",\\"instruction\\":\\"70% 3r3s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"95% 3r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"75% 3r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"70% 5r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"4RIR3s/(RPE6 8r3s)\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"50% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE6 8r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE6 6r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Snatch Push Press + Overhead Squat\\",\\"instruction\\":\\"70% 2+3r3s\\"},{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"68% 2r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"68% 2r3s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"95% 3r3s\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE6\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"75% 3r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"75% 3r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"75% 6r3s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"3RIR3s/(RPE7 5r3s)\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE7 8r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"68% 8r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE7 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean\\",\\"instruction\\":\\"75% 3r3s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"100% 3r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"78% 3r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"75% 5r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"3RIR3s/(RPE7 8r3s)\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"53% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE7 8r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE7 6r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Snatch Push Press + Overhead Squat\\",\\"instruction\\":\\"75% 2+3r3s\\"},{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"71% 2r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"71% 2r3s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"100% 3r3s\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE7\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"78% 3r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"78% 3r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"78% 6r3s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"2RIR3s/(RPE8 5r3s)\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE8 8r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"71% 8r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE8 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean\\",\\"instruction\\":\\"78% 3r3s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"105% 3r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"81% 3r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"78% 5r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"2RIR3s/(RPE8 8r3s)\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"55% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE8 8r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE8 6r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Snatch Push Press + Overhead Squat\\",\\"instruction\\":\\"80% 2+3r3s\\"},{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"74% 2r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"74% 2r3s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"105% 3r3s\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE8\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"81% 6r3s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"1RIR3s/(RPE9 5r3s)\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE9 8r3s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"74% 8r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE9 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"110% 3r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"81% 5r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"1RIR3s/(RPE9 8r3s)\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"58% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE9 8r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE9 6r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Snatch Push Press + Overhead Squat\\",\\"instruction\\":\\"83%+ 2+3r3s\\"},{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"77% 2r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"77% 2r3s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"110% 3r3s\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE9\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"80% 1r3s\\"},{\\"exerciseName\\":\\"Clean + Jerk\\",\\"instruction\\":\\"80% 1r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"80% 2r2s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"95% 2r2s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE5 6r2s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"65% 4r2s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE5 5r2s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"70% 1r4s\\"},{\\"exerciseName\\":\\"Power Clean + Split Jerk\\",\\"instruction\\":\\"70% 1r3s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"95% 2r2s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"75% 2r2s\\"}]}"}
212	Secondary Schools Cycle 2025	7	{"{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"73% 2r2s, 76% 1r2s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"100% 2r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"78% 2r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"78% 3r1s, 75% 3r3s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"4RIR3s/(RPE6 3r3s)\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE6 6r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE6 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean + Jerk\\",\\"instruction\\":\\"73% 2r2s, 76% 1r2s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"100% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"78% 2r1s, 75% 2r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE6 6r3s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"50% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE6 6r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE6 4r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Snatch Balance\\",\\"instruction\\":\\"75% 2r3s\\"},{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"70% 2r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"70% 2r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"4RIR3s/(RPE6 5r3s)\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE6\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"76% 2r2s, 79% 1r2s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"103% 2r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"81% 2r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"81% 3r1s, 78% 3r3s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"3RIR3s/(RPE6.5 3r3s)\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE6.5 6r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE6.5 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean + Jerk\\",\\"instruction\\":\\"76% 2r2s, 79% 1r2s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"103% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"81% 2r1s, 78% 2r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE6.5 6r3s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"52% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE6.5 6r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE6.5 4r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Snatch Balance\\",\\"instruction\\":\\"78% 2r3s\\"},{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"73% 2r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"73% 2r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"3RIR3s/(RPE6.5 5r3s)\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE6.5\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"79% 2r2s, 82% 1r2s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"105% 2r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"83% 2r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"84% 3r1s, 81% 3r3s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"2RIR3s/(RPE7 3r3s)\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE7 6r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE7 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean + Jerk\\",\\"instruction\\":\\"79% 2r2s, 82% 1r2s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"105% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"84% 2r1s, 81% 2r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE7 6r3s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"54% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE7 6r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE7 4r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Snatch Balance\\",\\"instruction\\":\\"81% 2r3s\\"},{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"75% 2r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"75% 2r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"2RIR3s/(RPE7 5r3s)\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE7\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"83% 1r4s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"106% 2r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"85% 2r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"86% 3r1s, 83% 3r2s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"1RIR3s/(RPE8 3r3s)\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE8 6r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE8 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean + Jerk\\",\\"instruction\\":\\"83% 1r4s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"106% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"86% 2r1s, 83% 3r2s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE8 6r3s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"56% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE8 6r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE8 4r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Snatch Balance\\",\\"instruction\\":\\"83% 1r3s\\"},{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"77% 1r4s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"77% 1r4s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"1RIR3s/(RPE8 5r3s)\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE8\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"86% 1r4s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"108% 2r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"87% 2r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"89% 3r1s, 85% 3r2s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"0RIR3s/(RPE9 3r3s)\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE9 6r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE9 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean + Jerk\\",\\"instruction\\":\\"86% 1r4s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"108% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"89% 2r1s, 85% 2r2s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE9 6r3s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"58% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE9 6r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE9 4r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Snatch Balance\\",\\"instruction\\":\\"86% 1r3s\\"},{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"79% 1r4s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"79% 1r4s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"0RIR3s/(RPE9 5r3s)\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE9\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"1RM\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"110% 2r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"1RM\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"2RIR3s/(RPE8 3r3s)\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE8 6r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE8 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Clean + Jerk\\",\\"instruction\\":\\"1RM\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"110% 2r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"2RM\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE8 6r3s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"58% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE8 6r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE8 4r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Snatch Balance\\",\\"instruction\\":\\"1RM\\"},{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"1RM\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"1RM\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"2RIR3s/(RPE8 5r3s)\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE8\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Snatch\\",\\"instruction\\":\\"80% 1r3s\\"},{\\"exerciseName\\":\\"Clean + Jerk\\",\\"instruction\\":\\"80% 1r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"80% 2r2s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"95% 2r2s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE5 6r2s\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"65% 4r2s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE5 5r2s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"70% 1r4s\\"},{\\"exerciseName\\":\\"Power Clean + Split Jerk\\",\\"instruction\\":\\"70% 1r3s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"95% 2r2s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"75% 2r2s\\"}]}"}
214	Sept-Oct Hyper Cycle 2025	5	{"{\\"day 1\\":[{\\"exerciseName\\":\\"Hang Snatch\\",\\"instruction\\":\\"70% 3r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"70% 3r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"70% 8r1s, 65% 8r2s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"85% 5r2s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"4RIR3s/(RPE6 8r3s)\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE6 8r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE6 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Hang Clean\\",\\"instruction\\":\\"70% 3r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"70% 5r3s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"85% 5r3s\\"},{\\"exerciseName\\":\\"Bulgarian Split Squat\\",\\"instruction\\":\\"RPE6 8r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE6 8r3s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"50% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE6 8r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE6 6r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"65% 3r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"65% 3r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"70% 5r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"4RIR3s/(RPE6 5r3s)\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE6\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Hang Snatch\\",\\"instruction\\":\\"75% 3r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"75% 3r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"75% 8r1s, 70% 8r2s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"90% 5r2s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"3RIR3s/(RPE7 8r3s)\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE7 8r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE7 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Hang Clean\\",\\"instruction\\":\\"75% 3r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"75% 5r3s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"90% 5r3s\\"},{\\"exerciseName\\":\\"Bulgarian Split Squat\\",\\"instruction\\":\\"RPE7 8r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE7 8r3s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"50% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE7 8r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE7 6r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"70% 3r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"70% 3r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"75% 5r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"3RIR3s/(RPE7 5r3s)\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE7\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Hang Snatch\\",\\"instruction\\":\\"80% 3r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"80% 3r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"80% 8r1s, 75% 8r2s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"95% 5r2s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"2RIR3s/(RPE8 8r3s)\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE8 8r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE8 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Hang Clean\\",\\"instruction\\":\\"80% 3r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"80% 5r3s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"95% 5r3s\\"},{\\"exerciseName\\":\\"Bulgarian Split Squat\\",\\"instruction\\":\\"RPE8 8r3s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE8 8r3s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"50% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE8 8r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE8 6r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"75% 3r3s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"75% 3r3s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"80% 5r3s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"2RIR3s/(RPE8 5r3s)\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE8\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Hang Snatch\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"8RM\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"100% 5r2s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"1RIR3s/(RPE9 8r3s)\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE9 8r3s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE9 8r3s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Hang Clean\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"5RM\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"95% 5r3s\\"},{\\"exerciseName\\":\\"Bulgarian Split Squat\\",\\"instruction\\":\\"RPE9 8r2s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE9 8r2s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"50% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE9 8r3s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE9 6r3s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"3RM\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"5RM\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"1RIR3s/(RPE9 5r3s)\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE9\\"}]}","{\\"day 1\\":[{\\"exerciseName\\":\\"Hang Snatch\\",\\"instruction\\":\\"70% 2r3s\\"},{\\"exerciseName\\":\\"Split Jerk\\",\\"instruction\\":\\"70% 2r3s\\"},{\\"exerciseName\\":\\"Back Squat\\",\\"instruction\\":\\"65% 6r2s\\"},{\\"exerciseName\\":\\"Snatch Pull\\",\\"instruction\\":\\"85% 3r2s\\"},{\\"exerciseName\\":\\"Pullups Unweighted/(Weighted)\\",\\"instruction\\":\\"5RIR3s/(RPE5 8r3s)\\"}],\\"day 1.5\\":[{\\"exerciseName\\":\\"Box Jumps\\",\\"instruction\\":\\"3r4s\\"},{\\"exerciseName\\":\\"Clean Romanian Deadlift\\",\\"instruction\\":\\"RPE5 6r2s\\"},{\\"exerciseName\\":\\"Back Extension Weighted \\",\\"instruction\\":\\"RPE5 6r2s\\"}],\\"day 2\\":[{\\"exerciseName\\":\\"Hang Clean\\",\\"instruction\\":\\"70% 2r3s\\"},{\\"exerciseName\\":\\"Push Press\\",\\"instruction\\":\\"70% 3r2s\\"},{\\"exerciseName\\":\\"Clean Pull\\",\\"instruction\\":\\"85% 3r2s\\"},{\\"exerciseName\\":\\"Bulgarian Split Squat\\",\\"instruction\\":\\"RPE5 6r2s\\"},{\\"exerciseName\\":\\"Back Extension\\",\\"instruction\\":\\"RPE5 6r2s\\"}],\\"day 2.5\\":[{\\"exerciseName\\":\\"Muscle Snatch\\",\\"instruction\\":\\"50% 2r3s\\"},{\\"exerciseName\\":\\"Pendlay Row\\",\\"instruction\\":\\"RPE5 6r2s\\"},{\\"exerciseName\\":\\"Seated Barbell Press\\",\\"instruction\\":\\"RPE5 6r2s\\"}],\\"day 3\\":[{\\"exerciseName\\":\\"Power Snatch\\",\\"instruction\\":\\"65% 1r4s\\"},{\\"exerciseName\\":\\"Power Clean\\",\\"instruction\\":\\"65% 1r4s\\"},{\\"exerciseName\\":\\"Front Squat\\",\\"instruction\\":\\"65% 3r2s\\"},{\\"exerciseName\\":\\"Dips Unweighted/(Weighted)\\",\\"instruction\\":\\"5RIR2s/(RPE5 5r2s)\\"},{\\"exerciseName\\":\\"Abs (your choice)\\",\\"instruction\\":\\"RPE5\\"}]}"}
\.


--
-- Name: instructor_instructorId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."instructor_instructorId_seq"', 2, true);


--
-- Name: learner_learnerId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."learner_learnerId_seq"', 238, true);


--
-- Name: practice_bests_pbId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."practice_bests_pbId_seq"', 241, true);


--
-- Name: programme_programmeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."programme_programmeId_seq"', 6, true);


--
-- Name: schedule_scheduleId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."schedule_scheduleId_seq"', 214, true);


--
-- Name: exercise exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY ("exerciseName");


--
-- Name: instructor instructor_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.instructor
    ADD CONSTRAINT instructor_email_key UNIQUE (email);


--
-- Name: instructor instructor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.instructor
    ADD CONSTRAINT instructor_pkey PRIMARY KEY ("instructorId");


--
-- Name: learner learner_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.learner
    ADD CONSTRAINT learner_pkey PRIMARY KEY ("learnerId");


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (name);


--
-- Name: practice_bests practice_bests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.practice_bests
    ADD CONSTRAINT practice_bests_pkey PRIMARY KEY ("pbId");


--
-- Name: programme programme_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programme
    ADD CONSTRAINT programme_pkey PRIMARY KEY ("programmeId");


--
-- Name: programme_schedule programme_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programme_schedule
    ADD CONSTRAINT programme_schedule_pkey PRIMARY KEY ("scheduleId", "programmeId");


--
-- Name: rep_max rep_max_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rep_max
    ADD CONSTRAINT rep_max_pkey PRIMARY KEY ("repMax");


--
-- Name: schedule schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_pkey PRIMARY KEY ("scheduleId");


--
-- Name: learner unique_email; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.learner
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: learner learner_programmeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.learner
    ADD CONSTRAINT "learner_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES public.programme("programmeId") ON DELETE SET NULL;


--
-- Name: practice_bests practice_bests_exerciseName_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.practice_bests
    ADD CONSTRAINT "practice_bests_exerciseName_fkey" FOREIGN KEY ("exerciseName") REFERENCES public.exercise("exerciseName") ON DELETE CASCADE;


--
-- Name: practice_bests practice_bests_learnerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.practice_bests
    ADD CONSTRAINT "practice_bests_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES public.learner("learnerId") ON DELETE CASCADE;


--
-- Name: practice_bests practice_bests_repMax_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.practice_bests
    ADD CONSTRAINT "practice_bests_repMax_fkey" FOREIGN KEY ("repMax") REFERENCES public.rep_max("repMax") ON DELETE CASCADE;


--
-- Name: programme_schedule programme_schedule_programmeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programme_schedule
    ADD CONSTRAINT "programme_schedule_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES public.programme("programmeId") ON DELETE CASCADE;


--
-- Name: programme_schedule programme_schedule_scheduleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programme_schedule
    ADD CONSTRAINT "programme_schedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES public.schedule("scheduleId") ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict f4bBfZ6lH7McaijOKNgc3hMo9gEMJAe2evypVsdV8c5QKQdpdxAti5NULeVzNgr

