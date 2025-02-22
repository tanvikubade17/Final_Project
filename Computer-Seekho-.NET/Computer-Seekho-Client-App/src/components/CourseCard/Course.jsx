import {useState,useEffect} from "react";
import "./Cource.css";

const Course = () => {
  const [cardsData, setCardsData] = useState([]); // State to store fetched courses

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("http://localhost:8080/course/getAll", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch courses");
                }

                const data = await response.json(); // Convert response to JSON
                
                // Transform fetched data to match card format
                const formattedCourses = data.map(course => ({
                    img: course.coverPhoto, // Assuming this is a valid image URL
                    title: course.courseName,
                    description: course.courseDescriptor
                }));

                setCardsData(formattedCourses); // Update state
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);
  return (
    <div>
      <div className="container">
        <div className="card__container">
          {cardsData.map((card, index) => (
            <article className="card__article" key={index}>
              <img src={card.img} alt={card.title} className="card__img" />
              <div className="card__data">
                <span className="card__description">{card.description}</span>
                <h2 className="card__title">{card.title}</h2>
                <a href="#" className="card__button">
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
