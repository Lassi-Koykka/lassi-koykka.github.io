import SiTypescript from "svelte-icons-pack/si/SiTypescript";
import SiReact from "svelte-icons-pack/si/SiReact";
import SiNodeDotJs from "svelte-icons-pack/si/SiNodeDotJs";
import SiDotNet from "svelte-icons-pack/si/SiDotNet";
import SiAndroid from "svelte-icons-pack/si/SiAndroid";
import SiSvelte from "svelte-icons-pack/si/SiSvelte";
import SiFlask from "svelte-icons-pack/si/SiFlask";
import SiBootstrap from "svelte-icons-pack/si/SiBootstrap";
import SiJavascript from "svelte-icons-pack/si/SiJavascript";
import SiPython from "svelte-icons-pack/si/SiPython";
import SiCsharp from "svelte-icons-pack/si/SiCsharp";
import SiJava from "svelte-icons-pack/si/SiJava";
import SiKotlin from "svelte-icons-pack/si/SiKotlin";
import SiAmazonaws from "svelte-icons-pack/si/SiAmazonaws";
import SiFirebase from "svelte-icons-pack/si/SiFirebase";
import SiDocker from "svelte-icons-pack/si/SiDocker";
import SiLinux from "svelte-icons-pack/si/SiLinux";
import SiWindows from "svelte-icons-pack/si/SiWindows";
import SiMongodb from "svelte-icons-pack/si/SiMongodb";
import SiMysql from "svelte-icons-pack/si/SiMysql";
import SiMicrosoftsqlserver from "svelte-icons-pack/si/SiMicrosoftsqlserver";


const content = {
    name: "Lassi Köykkä",
    title: "Full-stack developer",
    subtitles: [
        "Hiring a developer instead of using existing software solutions is like getting your suit from your tailor instead of a store.",
        "Either you fit the suit or the suit fits you."
    ],
    city: "Kuopio",
    hobbies: [
        "Programming",
        "Game development",
        "Climbing",
        "Gym",
        "Running"
    ],
    description: [
        "I'm a dedicated and self-motivated software developer working in the greater Kuopio region. Originally I am from Tampere.",

        "I'm comfortable working with both back- as well as front-end technologies and my main tools of trade are <strong style=\"color: #007acc\">TypeScript</strong>, <strong style=\"color: #61DAFB\">React</strong>, <strong style=\"color: #FF3E00\">Svelte</strong>, <strong style=\"color: #418C3C\">Node.js</strong>, <strong style=\"color: #512bd4\">.NET</strong> and <strong style=\"color: #FFDB4A\">Python</strong>, but I like to switch things up when I can and I'm not locked into any specific framework or language.",

        "I'm a quick learner and I wish to understand how things actually operate under the hood. I thoroughly enjoy the process of creative problem-solving and challenging myself by setting goals and restrictions. On my spare time, I often like to work on all kinds of personal projects, from APIs to websites, games and desktop applications. One of my favourite pastimes is playing around with new technologies and seeing what I can come up with. I have built all kinds of fun little projects over the past few years and you can find all of them on my GitHub account. :)",
        
        "I reside in Kuopio and am currently writing my thesis in information technology at Savonia University of Applied Sciences."
    ],
    workExperience: [
        {
            jobTitle: "Software Developer",
            company: "Talentree Oy",
            from: "May 2021",
            to: "Present"
        },
        {
            jobTitle: "Summer trainee in Communications Technology",
            company: "Istekki Oy",
            from: "May 2020",
            to: "Aug 2020"
        },
        {
            jobTitle: "Summer trainee in Communications Technology",
            company: "Istekki Oy",
            from: "Jun 2019",
            to: "Sep 2019"
        },
        {
            jobTitle: "CNC Machine Operator",
            company: "Honpumet Oy",
            from: "May 2018",
            to: "Dec 2018"
        }
    ],
    education: [
        {
            school: "Savonia University of Applied Sciences",
            degree: "Bachelor of Technology - Information Technology",
            from: "Jan 2019",
            to: "May 2022"
        },
        {
            school: "Tampereen klassillinen lukio",
            degree: "Finnish matriculation examination",
            from: "Aug 2015",
            to: "May 2018"
        }
    ],
    
    skills: {
        technologies: {
            LanguagesAndFrameworks: [
                {id: "typescript", name: "Typescript", icon: SiTypescript, color: "#2D79C7"},
                {id: "react", name: "React.js", icon: SiReact, color: "#61DAFB"},
                {id: "nodejs", name: "Node.js/Express", icon: SiNodeDotJs, color: "#659E60"},
                {id: "dotnet", name: ".NET", icon: SiDotNet, color: "#512bd4"},
                {id: "android", name: "Android", icon: SiAndroid, color: "#3EDC88"},
                {id: "svelte", name: "Svelte", icon: SiSvelte, color: "#FF3C00"},
                {id: "flask", name: "Flask", icon: SiFlask, color: "#FFF"},
                {id: "bootstrap", name: "Bootstrap", icon: SiBootstrap, color: "#8512FB"},
                {id: "javascript", name: "JavaScript/ES6", icon: SiJavascript, color: "#F0DB4F"},
                {id: "python", name: "Python", icon: SiPython, color: "#3474A7"},
                {id: "csharp", name: "C#", icon: SiCsharp, color: "#05930c"},
                {id: "kotlin", name: "Kotlin", icon: SiKotlin, color: "#3297FF"},
                {id: "java", name: "Java", icon: SiJava, color: "#FB0003"},
            ],
            other: [
                {name: "AWS Cloud Services", icon: SiAmazonaws, color: "#F79400"},
                {name: "Docker", icon: SiDocker, color: "#099CEC"},
                {name: "Firebase", icon: SiFirebase, color: "#FFCB2B"},
                {name: "Linux Servers", icon: SiLinux, color: "#FFF"},
                {name: "Windows Servers", icon: SiWindows, color: "#00AFEF"},
                {name: "MongoDB", icon: SiMongodb, color: "#419D3A"},
                {name: "MySQL", icon: SiMysql, color: "#00618A"},
                {name: "MS SQL Server", icon: SiMicrosoftsqlserver, color: "#C42626"},
            ]
        }
    },
    links: {
        github: "https://github.com/Lassi-Koykka",
        linkedin: "https://www.linkedin.com/in/lassi-koykka/",
    }
}

export default content;