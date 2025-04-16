
export const Skills = () => {
  const skills = [
    "Python",
    "LangChain",
    "Streamlit",
    "Linux",
    "MongoDB",
    "MySQL",
    "Git",
    "Docker",
    "JWT",
    "ORM",
    "OAuth"
  ];

  return (
    <section className="py-20 bg-white" id="skills">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium hover:bg-blue-100 transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
