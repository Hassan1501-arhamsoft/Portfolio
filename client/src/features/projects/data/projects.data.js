// import profileImg from '../../../assets/images/profile-pic.png';
import chatbot from '../../../assets/images/ai-chatbot.webp';
import facebook from '../../../assets/images/facebook-new.webp';
import expertTutor from '../../../assets/images/ExpertTutorWebsiteProject.webp';
import smartcar from '../../../assets/images/smartCarProject.webp';
import greenhouse from '../../../assets/images/GreenHouseproject.webp';
import faultDetection from '../../../assets/images/faultdetectionProject.webp';
import solarcleaner from '../../../assets/images/solarcleaner.webp';
import smartalram from '../../../assets/images/SmartAlarmProject.webp';
import codetector from '../../../assets/images/Codetectorproject.webp';
import smartrain from '../../../assets/images/RainShalterproject.webp';
import smartParking from '../../../assets/images/smartparkingsystem.webp';
import blinkstick from '../../../assets/images/blindstick.webp';
import smartDustbin from '../../../assets/images/smartdustbin.webp';

export const PROJECT_CATEGORIES = [
  'All',
  'AI & RAG',
  'Full-Stack',
  'Real-Time & IoT',
];

export const PROJECTS_DATA = [
  {
    id: 'hybrid-rag-chatbot',
    title: 'Enterprise Hybrid RAG AI Chatbot',
    category: 'AI & RAG',
    featured: true,
    image: chatbot,
    summary:
      'Production retrieval-augmented generation chatbot built on the MERN stack with hybrid vector-keyword retrieval, document-level ABAC security, and real-time token streaming.',
    architecture: [
      'Combines MongoDB Atlas Vector Search with keyword retrieval via Reciprocal Rank Fusion (RRF) and local cross-encoder re-ranking.',
      'Enforces OpenAI moderation guardrails, query transformation, and Attribute-Based Access Control (ABAC) metadata filtering prior to generation.',
      'Streams responses over Server-Sent Events (SSE) with conversation summarization, incremental ingestion, and automated LLM-as-a-Judge evaluation.',
    ],
    stack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB Vector Search',
      'RRF & Re-Ranking',
      'ABAC Security',
      'SSE Streaming',
    ],
    repoUrl: 'https://github.com/hassan42772',
    liveUrl: null,
  },
  {
    id: 'social-media-mern',
    title: 'Full-Stack Social Media Platform',
    category: 'Full-Stack',
    featured: true,
    image: facebook,
    summary:
      'Facebook-style social networking application supporting user profiles, dynamic newsfeeds, media posts, nested comments, reactions, and friend connections.',
    architecture: [
      'Engineered normalized MongoDB schemas and REST APIs for posts, comments, likes, friend requests, and user timelines.',
      'Secured user sessions and protected routes using HTTP-only JWT authentication and server-side payload validation.',
      'Built responsive feed interactions and optimistic state updates in React.js and Tailwind CSS.',
    ],
    stack: [
      'React.js',
      'Redux Toolkit',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT Auth',
      'Tailwind CSS',
    ],
    repoUrl: 'https://github.com/hassan42772',
    liveUrl: null,
  },
  {
    id: 'smart-parking-iot-web',
    title: 'Smart Parking System (IoT & Web Interface)',
    category: 'Real-Time & IoT',
    featured: true,
    image: smartParking,
    summary:
      'Hardware-to-cloud parking management platform pairing bay occupancy sensors and automated barrier gates with a live web monitoring interface.',
    architecture: [
      'Integrated IR/ultrasonic bay sensors and servo entry gates on a microcontroller to detect vehicle presence and automate gate actuation.',
      'Built a Node.js and Express telemetry API syncing real-time slot occupancy states and timestamps into MongoDB.',
      'Developed a live web dashboard displaying slot availability maps, active occupancy counts, and parking logs.',
    ],
    stack: [
      'ESP32 / Arduino',
      'IR & Ultrasonic',
      'Servo & LCD',
      'Node.js',
      'Express.js',
      'MongoDB',
      'React.js',
    ],
    repoUrl: 'https://github.com/hassan42772',
    liveUrl: null,
  },
  {
    id: 'expert-tutor-website',
    title: 'Expert Tutor Finder',
    category: 'Full-Stack',
    featured: true,
    image: expertTutor,
    summary:
      'Responsive React web application connecting students with verified subject tutors through multi-criteria search, profile comparisons, and session scheduling.',
    architecture: [
      'Built modular React components with instant filtering by subject domain, experience level, hourly rate, and availability.',
      'Designed structured tutor profile views, review highlights, and session inquiry workflows for streamlined student onboarding.',
      'Crafted a mobile-first, accessible interface using Tailwind CSS and client-side routing.',
    ],
    stack: [
      'React.js',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'React Router',
      'Context API',
    ],
    repoUrl: 'https://github.com/hassan42772',
    liveUrl: null,
  },
  {
    id: 'smart-dustbin-iot',
    title: 'Touchless Smart Dustbin & Fill-Level Monitor',
    category: 'Real-Time & IoT',
    featured: false,
    image: smartDustbin,
    summary:
      'Automated waste bin combining ultrasonic hand-proximity lid actuation with multi-stage LED fill-level and operational status indicators.',
    architecture: [
      'Mounted a front-facing HC-SR04 ultrasonic sensor to detect user proximity and trigger hands-free lid opening with timed auto-close.',
      'Engineered an internal servo linkage inside the hinged lid housing for smooth, jam-free opening and closing cycles.',
      'Integrated a 3-LED status array (green, yellow, red) to signal standby readiness, active sensing, and bin capacity alerts.',
    ],
    stack: [
      'Arduino Uno',
      'HC-SR04 Ultrasonic',
      'Servo Motor',
      'LED Indicators',
      'Embedded C++',
    ],
    repoUrl: 'https://github.com/hassan42772',
    liveUrl: null,
  },
  {
    id: 'smart-car-iot',
    title: 'Autonomous Obstacle-Avoiding Smart Car',
    category: 'Real-Time & IoT',
    featured: false,
    image: smartcar,
    summary:
      'Embedded robotic vehicle engineered for real-time ultrasonic obstacle detection, dynamic path rerouting, and wireless manual control.',
    architecture: [
      'Mounted an ultrasonic rangefinder on a servo gimbal to scan left/right clearance angles and compute collision-free turns.',
      'Controlled dual DC drive motors with PWM speed modulation and differential steering via an L298N H-bridge driver.',
      'Added wireless Bluetooth serial control for seamless switching between autonomous navigation and remote driving.',
    ],
    stack: [
      'Arduino Uno',
      'Ultrasonic Sensor',
      'L298N Driver',
      'Servo Gimbal',
      'Bluetooth HC-05',
      'Embedded C++',
    ],
    repoUrl: 'https://github.com/hassan42772',
    liveUrl: null,
  },
  {
    id: 'greenhouse-automation-iot',
    title: 'Automated Greenhouse Climate & Irrigation System',
    category: 'Real-Time & IoT',
    featured: false,
    image: greenhouse,
    summary:
      'Closed-loop agricultural monitoring system regulating soil moisture, ambient temperature, and humidity to automate irrigation and ventilation.',
    architecture: [
      'Polled DHT11/DHT22 temperature-humidity sensors and soil moisture probes to track microclimate thresholds continuously.',
      'Triggered relay-switched water pumps, cooling fans, and grow lights automatically whenever readings drifted out of range.',
      'Displayed live sensor metrics and actuator states on an I2C LCD panel for on-site inspection.',
    ],
    stack: [
      'Arduino / ESP32',
      'DHT22 Sensor',
      'Soil Moisture Probe',
      'Relay Module',
      'I2C LCD',
      'Embedded C++',
    ],
    repoUrl: 'https://github.com/hassan42772',
    liveUrl: null,
  },
  {
    id: 'line-fault-detection-iot',
    title: 'Power Line Fault Detection & Distance Locator',
    category: 'Real-Time & IoT',
    featured: false,
    image: faultDetection,
    summary:
      'Microcontroller-based electrical diagnostic system that detects line-to-ground and line-to-line faults and calculates fault distance in kilometers.',
    architecture: [
      'Used precision voltage-divider sensing networks across simulated feeder lines to measure impedance drops under fault conditions.',
      'Sampled analog ADC channels to identify the faulted phase and compute exact distance to the fault point.',
      'Isolated affected lines via relays while displaying fault phase and distance telemetry on an LCD with audible buzzer alerts.',
    ],
    stack: [
      'Arduino Uno',
      'ADC Voltage Sensing',
      'Relay Isolation',
      'I2C LCD',
      'Fault Algorithm',
      'Embedded C++',
    ],
    repoUrl: 'https://github.com/hassan42772',
    liveUrl: null,
  },
  {
    id: 'solar-panel-cleaner-iot',
    title: 'Automated Solar Panel Cleaning System',
    category: 'Real-Time & IoT',
    featured: false,
    image: solarcleaner,
    summary:
      'Mechatronic maintenance rig engineered to clear dust buildup from photovoltaic panels on automated schedules to prevent efficiency loss.',
    architecture: [
      'Drove a rail-mounted microfiber wiper carriage across the panel surface using geared DC motors and end-stop limit switches.',
      'Synchronized a relay-controlled water spray pump during forward cleaning passes to remove stubborn grime.',
      'Implemented scheduled cleaning cycles with low-idle power draw to preserve net solar generation.',
    ],
    stack: [
      'Arduino Uno',
      'DC Gear Motors',
      'Limit Switches',
      'Water Pump & Relay',
      'LDR Sensor',
      'Embedded C++',
    ],
    repoUrl: 'https://github.com/hassan42772',
    liveUrl: null,
  },
  {
    id: 'smart-rain-shelter-iot',
    title: 'Automated Smart Rain Shelter System',
    category: 'Real-Time & IoT',
    featured: false,
    image: smartrain,
    summary:
      'Weather-responsive motorized canopy that deploys overhead cover automatically upon rainfall detection and retracts once dry conditions return.',
    architecture: [
      'Calibrated an analog raindrop conductance sensor with threshold filtering to prevent false triggers from morning dew.',
      'Actuated a bidirectional motor/servo mechanism with limit switches to smoothly extend and retract the shelter roof.',
      'Provided status LEDs and a manual override switch for controlled operation.',
    ],
    stack: [
      'Arduino Uno',
      'Raindrop Sensor',
      'Servo / DC Drive',
      'Limit Switches',
      'Embedded C++',
    ],
    repoUrl: 'https://github.com/hassan42772',
    liveUrl: null,
  },
  {
    id: 'smart-blind-stick-iot',
    title: 'Ultrasonic & Water-Sensing Smart Blind Stick',
    category: 'Real-Time & IoT',
    featured: false,
    image: blinkstick,
    summary:
      'Assistive mobility cane delivering real-time audio and haptic proximity alerts for obstacles, stairs, and wet floor hazards.',
    architecture: [
      'Combined forward-facing ultrasonic distance sensing with downward water-detection electrodes near the cane tip.',
      'Mapped object proximity to variable-frequency buzzer tones and vibration motor pulses for intuitive non-visual feedback.',
      'Optimized polling loops for low-power battery operation in a compact, portable enclosure.',
    ],
    stack: [
      'Arduino Nano',
      'Ultrasonic Sensor',
      'Water Sensor',
      'Haptic & Buzzer',
      'Embedded C++',
    ],
    repoUrl: 'https://github.com/hassan42772',
    liveUrl: null,
  },
  {
    id: 'co-gas-detector-iot',
    title: 'Carbon Monoxide (CO) Gas Detector & Alert System',
    category: 'Real-Time & IoT',
    featured: false,
    image: codetector,
    summary:
      'Embedded air-quality safety monitor tracking hazardous carbon monoxide concentrations and triggering automated exhaust ventilation and alarms.',
    architecture: [
      'Interfaced an MQ-7 electrochemical CO sensor with analog baseline calibration to measure gas concentrations in PPM.',
      'Configured multi-stage safety thresholds to trigger high-decibel alarms, warning LEDs, and relay-driven exhaust fans.',
      'Rendered live PPM readings and system safety states on an I2C LCD display.',
    ],
    stack: [
      'Arduino Uno',
      'MQ-7 CO Sensor',
      'Relay Ventilation',
      'I2C LCD',
      'Audio Alarm',
      'Embedded C++',
    ],
    repoUrl: 'https://github.com/hassan42772',
    liveUrl: null,
  },
  {
    id: 'smart-alarm-iot',
    title: 'Multi-Sensor Smart Security & Wake Alarm',
    category: 'Real-Time & IoT',
    featured: false,
    image: smartalram,
    summary:
      'Microcontroller-driven smart alarm unit integrating real-time clock scheduling, motion/presence detection, and physical disarm verification.',
    architecture: [
      'Integrated a DS3231 Real-Time Clock (RTC) module for accurate timekeeping across power interruptions.',
      'Paired PIR motion and ultrasonic presence sensors to detect unauthorized movement or verify user wake-up.',
      'Built keypad/button disarm logic with live clock and alarm status output on an LCD screen.',
    ],
    stack: [
      'Arduino Uno',
      'DS3231 RTC',
      'PIR Motion Sensor',
      'I2C LCD',
      'Buzzer & Keypad',
      'Embedded C++',
    ],
    repoUrl: 'https://github.com/hassan42772',
    liveUrl: null,
  },
];

// Named alias required by ProjectsSection.jsx
export const PROJECTS = PROJECTS_DATA;