import ProjectCard from '../components/projects/ProjectCard';

function Projects() {
  const projectsData = [
    {
      id: 1,
      title: "Project 1: Movie Sentiment Analyzer",
      description: "Built an end-to-end text classification pipeline to predict sentiment in movie reviews using Scikit-learn and PyTorch. Explored feature engineering techniques such as TF-IDF and implemented neural networks for improved accuracy. Gained experience in natural language processing, model evaluation, and handling unstructured text data in Python.",
      image: "/3-tips-sentiment-analysis.jpg",
      alternate: false
    },
    {
      id: 2,
      title: "Project 2: Weather Predictor",
      description: "Built a multilayer perceptron (MLP) from scratch using NumPy, Pandas, and SciPy to predict weather conditions from time-series data. Implemented forward and backward propagation manually, exploring GeLU activations, L2 regularization, and residual connections to improve generalization. Strengthened understanding of neural network fundamentals, numerical optimization, and time-series data handling in Python.",
      image: "/Weather-Icons.png",
      alternate: true
    },
    {
      id: 3,
      title: "Project 3: Hidden Markov Model",
      description: "Developed a two-state Hidden Markov Model (HMM) from scratch to model time-series data with latent structure. Implemented the forward-backward algorithm for inference and the Baum-Welch algorithm for unsupervised learning of transition and emission probabilities. Gained hands-on experience with probabilistic modeling, expectation-maximization, and sequence data analysis. Strengthened understanding of hidden state dynamics and unsupervised learning techniques in Python.",
      image: "/HMM-Picture.jpg",
      alternate: false
    }
  ];

  return (
    <div className="tab-panel active">
      <div className="Projects-List">
        {projectsData.map(project => (
          <ProjectCard 
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            alternate={project.alternate}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;