import SiTypescript from "svelte-icons-pack/si/SiTypescript";
import SiReact from "svelte-icons-pack/si/SiReact";
import SiNodeDotJs from "svelte-icons-pack/si/SiNodedotjs";
import SiDotNet from "svelte-icons-pack/si/SiDotnet";
import SiAndroid from "svelte-icons-pack/si/SiAndroid";
import SiSvelte from "svelte-icons-pack/si/SiSvelte";
import SiJavascript from "svelte-icons-pack/si/SiJavascript";
import SiPython from "svelte-icons-pack/si/SiPython";
import SiCsharp from "svelte-icons-pack/si/SiCsharp";
import SiJava from "svelte-icons-pack/si/SiOpenjdk";
import SiPHP from "svelte-icons-pack/si/SiPhp";
import SiGo from "svelte-icons-pack/si/SiGo";
import SiKotlin from "svelte-icons-pack/si/SiKotlin";
import SiAmazonaws from "svelte-icons-pack/si/SiAmazonaws";
import SiFirebase from "svelte-icons-pack/si/SiFirebase";
import SiDocker from "svelte-icons-pack/si/SiDocker";
import SiLinux from "svelte-icons-pack/si/SiLinux";
import SiUnity from "svelte-icons-pack/si/SiUnity";
import SiGodot from "svelte-icons-pack/si/SiGodotengine";
import SiMongodb from "svelte-icons-pack/si/SiMongodb";
import SiMysql from "svelte-icons-pack/si/SiMysql";
import SiMicrosoftsqlserver from "svelte-icons-pack/si/SiMicrosoftsqlserver";
import SiGraphql from "svelte-icons-pack/si/SiGraphql";
import SiCypress from "svelte-icons-pack/si/SiCypress";
import SiHacking from "svelte-icons-pack/si/SiTryhackme";
import BsTree from "svelte-icons-pack/bs/BsTree"; 


const content = {
    name: "Lassi Köykkä",
    title: "Full-stack developer",
    // subtitles: [
    //     "Hiring a developer instead of using existing software solutions is like getting your suit from your tailor instead of a store.",
    //     "Either you fit the suit or the suit fits you."
    // ],
    subtitles: [
        "full-stack",
        "mobile_dev",
        "cyber_sec",
        "game_dev",
        "iot_dev",
        "linux_admin",
    ],
    city: "Tampere",
    hobbies: [
        "Programming",
        "Game development",
        "Climbing",
        "Gym",
        "Running"
    ],
    description: [
        `I'm a dedicated and self-motivated software developer currently residing near Tampere. 
            I'm comfortable working with both back- as well as front-end technologies and my main tools of trade are 
            <strong style="color: #007acc\">TypeScript</strong>, 
            <strong style="color: #79d4fd\">Go</strong>, 
            <strong style="color: #FF3E00\">Svelte</strong>, 
            <strong style="color: #61DAFB\">React</strong>, 
            <strong style="color: #418C3C\">Node.js</strong>, 
            <strong style="color: #512bd4\">.NET</strong> and <strong style="color: #FFDB4A">Python</strong>, 
            but I like to switch things up when I can and I'm not locked into any specific framework or language.`,
        `I'm a quick learner and I wish to understand how things actually operate under the hood. 
            I thoroughly enjoy the process of creative problem-solving and challenging myself by setting goals and restrictions. 
            On my spare time, I like to take part in coding challenges and work on all kinds of personal projects, from APIs to websites, games and desktop applications. 
            I have also recently grown an interest in <strong style=\"color: crimson\">cyber security</strong> and <strong style=\"color: #3E3\">ethical hacking</strong>,
            which I have been self-studying on my spare-time by completing CTF-challenges and by using platforms such as OverTheWire, TryHackMe and HackTheBox. 
            One of my favourite pastimes is playing around with new technologies and seeing what I can come up with. 
            I have built all kinds of fun little projects over the past few years and you can find all of them on my <a href=\"https://github.com/lassi-koykka\" style=\"color: lightblue; text-decoration: underline\">GitHub account</a>. :)`,
        "I have completed my thesis in information technology at Savonia University of Applied Sciences in Kuopio."
    ],
    workExperience: [
        {
            jobTitle: "Full-Stack Software Developer",
            company: "Talentree Oy",
            emoji: "👨‍💻",
            from: "May 2021",
            to: "Present"
        },
        {
            jobTitle: "Summer trainee in Communications Technology",
            emoji: "📶",
            company: "Istekki Oy",
            from: "May 2020",
            to: "Aug 2020"
        },
        {
            jobTitle: "Summer trainee in Communications Technology",
            emoji: "📶",
            company: "Istekki Oy",
            from: "Jun 2019",
            to: "Sep 2019"
        },
        {
            jobTitle: "CNC Machine Operator",
            emoji: "🏭",
            company: "Honpumet Oy",
            from: "May 2018",
            to: "Dec 2018"
        }
    ],
    education: [
        {
            school: "Savonia University of Applied Sciences",
            degree: "Bachelor of Technology - Information Technology",
            emoji: "🖥️",
            from: "Jan 2019",
            to: "May 2022"
        },
        {
            school: "Tampereen klassillinen lukio",
            degree: "Finnish matriculation examination",
            emoji: "🏫",
            from: "Aug 2015",
            to: "May 2018"
        }
    ],
    
    skills: {
        technologies: {
            languagesAndFrameworks: [
                {id: "typescript", name: "Typescript", icon: SiTypescript, color: "#2D79C7"},
                {id: "go", name: "Go", icon: SiGo, color: "#79d4fd"},
                {id: "svelte", name: "Svelte", icon: SiSvelte, color: "#FF3C00"},
                {id: "react", name: "React.js", icon: SiReact, color: "#61DAFB"},
                {id: "nodejs", name: "Node.js", icon: SiNodeDotJs, color: "#659E60"},
                {id: "dotnet", name: ".NET", icon: SiDotNet, color: "#512bd4"},
                {id: "javascript", name: "JavaScript", icon: SiJavascript, color: "#F0DB4F"},
                {id: "python", name: "Python", icon: SiPython, color: "#3474A7"},
                {id: "csharp", name: "C#", icon: SiCsharp, color: "#05930c"},
                {id: "kotlin", name: "Kotlin", icon: SiKotlin, color: "#3297FF"},
                {id: "php", name: "PHP", icon: SiPHP, color: "#4f5b93"},
                {id: "java", name: "Java", icon: SiJava, color: "#FB0003"},
            ],
            other: [
                {id: "aws", name: "AWS Cloud", icon: SiAmazonaws, color: "#F79400"},
                {id: "graphql", name: "GraphQL", icon: SiGraphql, color: "#e632ad"},
                {id: "firebase", name: "Firebase", icon: SiFirebase, color: "#FFCB2B"},
                {id: "docker", name: "Docker", icon: SiDocker, color: "#099CEC"},
                {id: "cypress", name: "Cypress", icon: SiCypress, color: "#C42626"},
                {id: "android", name: "Android", icon: SiAndroid, color: "#3EDC88"},
                {id: "unity", name: "Unity", icon: SiUnity, color: "#f3f3f3"},
                {id: "godot", name: "Godot", icon: SiGodot, color: "#478cbf"},
                {id: "mongodb", name: "MongoDB", icon: SiMongodb, color: "#419D3A"},
                {id: "mysql", name: "MySQL", icon: SiMysql, color: "#00618A"},
                {id: "mssql", name: "MS SQL Server", icon: SiMicrosoftsqlserver, color: "#C42626"},
                {id: "linux_admin", name: "Linux admin", icon: SiLinux, color: "#FFF"},
                {id: "hacking", name: "Hacking", icon: SiHacking, color: "#419D3A"},
                {id: "coding-challenge", name: "Challenges", icon: BsTree, color: "#512bd4"},
            ],
        }
    },
    links: {
        github: "https://github.com/Lassi-Koykka",
        linkedin: "https://www.linkedin.com/in/lassi-koykka/",
    }
}

export default content;
