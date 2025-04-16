
export const Experience = () => {
  const experiences = [
    {
      company: "NextAI",
      location: "Kathmandu",
      position: "AI Engineer Trainee",
      period: "06/2024",
      description: "AI Chatbot Development and Management, Streamlit Dashboard with MongoDB and implemented asynchronous aggregation pipeline, Backend Development with FastAPI"
    },
    {
      company: "Inspiring Lab",
      location: "Lalitpur",
      position: "Python Intern",
      period: "11/2023 - 02/2024",
      description: "Beautiful Soup, Selenium, Scrapy, FastAPI, JSON Web Tokens (JWT), OAuth2, PostgreSQL & Docker"
    },
    {
      company: "ACE",
      location: "Bhaktapur",
      position: "Web Developer",
      period: "07/2019 - 01/2021",
      description: "Developed a robust authentication and authorization system, optimized database queries with caching, and implemented a content delivery network to enhance performance."
    }
  ];

  return (
    <section className="py-20 bg-white" id="experience">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="border-l-2 border-blue-500 pl-4 ml-4">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold">{exp.position}</h3>
                <div className="text-blue-600 font-medium">{exp.company} | {exp.location}</div>
                <div className="text-gray-500 text-sm mb-2">{exp.period}</div>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
