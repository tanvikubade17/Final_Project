import React, { useState } from "react";
import "./cardForMoreValue.css";

const cards = [
    { title: "Vision", description: "Our company vision focuses on creating a world where education is accessible, innovative, and transformative. Our goal is to empower students with the skills, knowledge, and ethical values needed to excel in a rapidly changing world. We strive to create an environment where students can think critically, solve real-world problems, and develop leadership qualities. Our vision extends beyond academic excellence; we focus on holistic growth by integrating technology, research, and industry-driven education. By fostering a culture of inclusivity and collaboration, we aim to build a global network of learners and educators. We believe that education should not just be about acquiring degrees but about making meaningful contributions to society. Through continuous innovation and strong partnerships, we are committed to setting new standards in education and shaping the leaders of tomorrow.", icon: "👀" },

    { title: "Mission", description: "Our mission is to provide high-quality, innovative, and inclusive education that prepares students for the challenges of the 21st century. We focus on academic excellence, skill development, and character building to create responsible global citizens. We are committed to delivering world-class education with a strong emphasis on research, technology, and industry relevance. Our goal is to develop industry-ready professionals by integrating practical training, internships, and collaborative projects. We strive to ensure equal access to education by providing scholarships, financial aid, and special support programs for students from diverse backgrounds. Our mission is to not only educate but to inspire and empower students to be change-makers in society.", icon: "🚀" },

    { title: "Awards", description: "Over the years, our institute has been recognized for its excellence in academics, research, and community engagement. We take pride in our achievements, which reflect our commitment to delivering quality education and fostering innovation. Some of our major awards include: 'Best Educational Institution' for academic excellence and research contributions, 'Excellence in Innovation' for our pioneering projects in artificial intelligence and machine learning, 'Outstanding Industry Collaboration' for our strong partnerships with leading companies, and 'Social Impact Award' for our community outreach programs that support underprivileged students. These awards inspire us to continuously improve, innovate, and contribute to the field of education.", icon: "🏆" },

    { title: "History", description: "Founded with a vision to revolutionize education, our institute has grown into a premier center for learning, research, and innovation. From humble beginnings, we have evolved into a globally recognized institution. Key Milestones: Year 2000 - Established with a commitment to academic excellence. Year 2005 - Expanded programs to include technology and management studies. Year 2010 – Collaborated with international universities for research initiatives. Year 2015  Launched online learning platforms for global outreach. Year 2022  Recognized as a leading institute for technological advancements. Our journey reflects our dedication to staying ahead of educational trends and embracing innovation.", icon: "📜" },

    { title: "Director's View", description: "The Director's vision plays a crucial role in shaping the institute's values, policies, and direction. In the words of our Director: 'Education is not just about learning facts; it is about developing the ability to think, analyze, and innovate. Our mission is to prepare students for the future by equipping them with the skills, knowledge, and ethical foundation needed to succeed in their careers and contribute to society.' Our Director emphasizes: Adapting to technological advancements to keep our curriculum industry-relevant, encouraging research and innovation to solve real-world problems, and building a strong network of alumni and industry partnerships to create opportunities for students.", icon: "🎥" },

    { title: "Cdac View", description: "As a leading technology and education hub, CDAC (Centre for Development of Advanced Computing) plays a vital role in shaping modern education. Our institute collaborates with CDAC to integrate cutting-edge technologies into our curriculum. CDAC emphasizes high-performance computing and AI-driven education, skill development in emerging fields like cybersecurity, blockchain, and cloud computing, and industry-academia collaboration to ensure students gain real-world exposure. Through our partnership with CDAC, we provide students with access to advanced training programs, research opportunities, and global certifications, ensuring they stay ahead in the competitive job market.", icon: "🏥" },
];

// Modal Component
const Modal = ({ title, description, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>✖</button>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

const Card = ({ title, description, icon, onReadMore }) => {
    return (
        <div className="cardofMore">
            <span className="icon">{icon}</span>
            <h2>{title}</h2>
            <p>{description.substring(0, 100)}...</p>
            <button onClick={onReadMore}>Read More</button>
        </div>
    );
};

const CardsForMoreValue = () => {
    const [selectedCard, setSelectedCard] = useState(null);

    return (
        <div className="card-grid">
            {cards.map((card, index) => (
                <Card
                    key={index}
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                    onReadMore={() => setSelectedCard(card)}
                />
            ))}

            {selectedCard && (
                <Modal
                    title={selectedCard.title}
                    description={selectedCard.description}
                    onClose={() => setSelectedCard(null)}
                />
            )}
        </div>
    );
};

export default CardsForMoreValue;