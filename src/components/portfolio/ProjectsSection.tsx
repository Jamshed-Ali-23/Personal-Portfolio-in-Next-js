import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Sparkles, Eye } from "lucide-react";
import { useState } from "react";
import { ProjectDetailModal } from "./ProjectDetailModal";

// Project Card Component - Clean dark style with warm colors
const ProjectCard = ({ project, index, delay, onViewDetails }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ delay, duration: 0.5 }}
      className="group relative bg-gradient-to-br from-stone-900/90 to-stone-800/70 border border-amber-400/20 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 border-b border-amber-400/20 px-6 py-5">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h3 className="text-xl font-bold text-amber-300 relative z-10 flex items-center gap-2">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {project.icon}
          </motion.span>
          {project.title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {/* Problem */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-xs font-bold text-red-400">
              ?
            </div>
            <h4 className="font-semibold text-stone-200">The Problem</h4>
          </div>
          <p className="text-stone-400 text-sm ml-9 line-clamp-2">{project.problem}</p>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-xs">
              ⚙️
            </div>
            <h4 className="font-semibold text-stone-200">Technologies Used</h4>
          </div>
          <div className="flex flex-wrap gap-2 ml-9">
            {project.techStack.map((tech: string, i: number) => (
              <motion.div
                key={tech}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ delay: delay + 0.1 + i * 0.05, type: "spring" }}
              >
                <Badge className="px-3 py-1.5 text-xs bg-amber-900/40 border border-amber-400/50 text-amber-200 hover:bg-amber-800/50 hover:border-amber-300 cursor-pointer transition-colors">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Solution */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-xs font-bold text-green-400">
              ✓
            </div>
            <h4 className="font-semibold text-stone-200">The Solution</h4>
          </div>
          <p className="text-stone-400 text-sm ml-9 line-clamp-2">{project.solution}</p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3 pt-5 border-t border-amber-400/10">
          {/* View Details Button - Primary Action */}
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onViewDetails(project);
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Full Details
            </Button>
          </motion.div>
          
          {/* Secondary Actions */}
          <div className="flex gap-3">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-amber-300 hover:text-amber-200 hover:bg-amber-500/15 border border-amber-400/20 hover:border-amber-400/40 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            </motion.div>
            {project.liveUrl && project.liveUrl !== "#" && (
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-amber-300 hover:text-amber-200 hover:bg-amber-500/15 border border-amber-400/20 hover:border-amber-400/40 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Demo
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const projects = [
    {
      id: 1,
      title: "Asia Cup 2025 Predictor",
      icon: "🏏",
      category: "Machine Learning",
      duration: "2 weeks",
      problem: "Accurately forecasting cricket match outcomes in the Asia Cup tournament based on historical powerplay statistics and real-time scenarios.",
      techStack: ["Python", "Streamlit", "Machine Learning", "Scikit-learn", "Pandas", "NumPy"],
      solution: "Built a predictive model analyzing historical powerplay data with real-time match simulations. Deployed on Streamlit Cloud for interactive predictions with live score integration.",
      fullDescription: "This comprehensive cricket prediction system leverages machine learning algorithms to forecast match outcomes during the Asia Cup 2025. The application analyzes historical powerplay data, team performance metrics, and real-time match conditions to provide accurate predictions. Users can simulate different scenarios and see how various factors affect the predicted outcome.",
      features: [
        "Real-time match prediction based on live scores",
        "Historical powerplay data analysis",
        "Interactive scenario simulation",
        "Team performance comparison dashboard",
        "Win probability calculator",
        "Player impact analysis"
      ],
      challenges: [
        "Handling incomplete historical data for newer teams",
        "Balancing model accuracy with real-time performance",
        "Creating intuitive UI for complex statistical concepts",
        "Integrating live score APIs efficiently"
      ],
      results: [
        "Achieved 75%+ prediction accuracy in test matches",
        "Deployed successfully on Streamlit Cloud",
        "Interactive dashboard with real-time updates",
        "Positive user feedback on prediction accuracy"
      ],
      images: [
        "/project-images/asia-cup-1.png",
        "/project-images/asia-cup-2.png",
        "/project-images/asia-cup-3.png"
      ],
      demoVideo: "",
      githubUrl: "https://github.com/Jamshed-Ali-23/Asia-Cup-2025-Predictor-Dashboard",
      liveUrl: "#"
    },
    {
      id: 2,
      title: "Customer Segmentation (RFM Analysis)",
      icon: "👥",
      category: "Data Analytics",
      duration: "1 week",
      problem: "Identifying high-value vs at-risk customer segments for targeted retention and marketing strategies in a competitive retail environment.",
      techStack: ["Python", "Pandas", "K-Means Clustering", "Seaborn", "Matplotlib", "Scikit-learn"],
      solution: "Implemented unsupervised learning with K-Means clustering to segment customers into 'Champions', 'Loyal', and 'At-Risk' groups based on Recency, Frequency, and Monetary value metrics.",
      fullDescription: "This customer segmentation project applies RFM (Recency, Frequency, Monetary) analysis combined with K-Means clustering to identify distinct customer segments. The analysis helps businesses understand their customer base better and create targeted marketing strategies for each segment, from high-value 'Champions' to 'At-Risk' customers who need retention efforts.",
      features: [
        "Automated RFM score calculation",
        "K-Means clustering for customer grouping",
        "Visual customer segment distribution",
        "Actionable insights per segment",
        "Export functionality for marketing teams",
        "Segment performance comparison"
      ],
      challenges: [
        "Determining optimal number of clusters",
        "Handling outliers in monetary values",
        "Creating meaningful segment names",
        "Validating cluster quality and stability"
      ],
      results: [
        "Identified 5 distinct customer segments",
        "20% improvement in marketing ROI projection",
        "Clear actionable strategies per segment",
        "Reusable pipeline for future analysis"
      ],
      images: [
        "/project-images/rfm-1.png",
        "/project-images/rfm-2.png"
      ],
      demoVideo: "",
      githubUrl: "https://github.com/Jamshed-Ali-23/-Customer-Segmentation-with-RFM-Analysis",
      liveUrl: "#"
    },
    {
      id: 3,
      title: "Retail Insights Dashboard",
      icon: "📊",
      category: "Business Intelligence",
      duration: "2 weeks",
      problem: "Tracking complex retail KPIs across multiple product categories and time periods with manual reporting consuming 25+ hours monthly.",
      techStack: ["Power BI", "DAX", "Power Query", "SQL", "Excel", "Data Modeling"],
      solution: "Engineered custom DAX measures for revenue trends, inventory tracking, and profit margin analysis. Automated data refresh reduced manual reporting by 20% with real-time KPI dashboards.",
      fullDescription: "A comprehensive Power BI dashboard solution designed for retail analytics. This project transforms raw sales data into actionable insights through interactive visualizations, custom DAX measures, and automated reporting. The dashboard provides real-time visibility into sales performance, inventory levels, and profitability across multiple dimensions.",
      features: [
        "Real-time sales performance tracking",
        "Inventory level monitoring and alerts",
        "Profit margin analysis by category",
        "Time-series trend analysis",
        "Drill-down capabilities by region/store",
        "Automated scheduled data refresh"
      ],
      challenges: [
        "Complex DAX calculations for YoY comparisons",
        "Optimizing data model for large datasets",
        "Creating responsive mobile-friendly layouts",
        "Implementing row-level security"
      ],
      results: [
        "20% reduction in manual reporting time",
        "Real-time KPI visibility for stakeholders",
        "Improved inventory turnover decisions",
        "Adopted by management for weekly reviews"
      ],
      images: [
        "/project-images/retail-1.png",
        "/project-images/retail-2.png",
        "/project-images/retail-3.png"
      ],
      demoVideo: "",
      githubUrl: "https://github.com/Jamshed-Ali-23/Sales-Dashboard-PowerBI",
      liveUrl: "https://github.com/Jamshed-Ali-23/Sales-Dashboard-PowerBI"
    },
    {
      id: 4,
      title: "Walmart Sales Forecasting",
      icon: "🛒",
      category: "Predictive Analytics",
      duration: "10 days",
      problem: "Predicting future sales volumes to optimize inventory and staffing decisions across multiple Walmart store locations.",
      techStack: ["Python", "Pandas", "NumPy", "Seaborn", "Power BI", "Time Series Analysis"],
      solution: "Performed EDA to identify seasonal patterns and trends. Built time-series forecasting models and visualized insights in interactive Power BI dashboards for decision-makers.",
      fullDescription: "This sales forecasting project analyzes Walmart's historical sales data to predict future trends and optimize business operations. Through extensive exploratory data analysis, the project identifies seasonal patterns, holiday effects, and store-specific trends. The insights are presented through an interactive Power BI dashboard for easy consumption by decision-makers.",
      features: [
        "Seasonal trend identification",
        "Holiday impact analysis",
        "Store-level performance comparison",
        "Demand forecasting models",
        "Interactive Power BI dashboard",
        "Anomaly detection for unusual sales"
      ],
      challenges: [
        "Handling missing sales data periods",
        "Accounting for holiday effects on sales",
        "Regional variations in consumer behavior",
        "Integrating Python analysis with Power BI"
      ],
      results: [
        "Identified key seasonal patterns",
        "Improved inventory planning accuracy",
        "Clear visualization of sales trends",
        "Actionable insights for store managers"
      ],
      images: [
        "/project-images/walmart-1.png",
        "/project-images/walmart-2.png"
      ],
      demoVideo: "",
      githubUrl: "https://github.com/Jamshed-Ali-23/Walmart-Sales-Analysis",
      liveUrl: "#"
    },
    {
      id: 5,
      title: "Titanic Survival Prediction",
      icon: "🚢",
      category: "Machine Learning",
      duration: "1 week",
      problem: "Predicting passenger survival rates on the Titanic using historical passenger data with varying levels of data completeness.",
      techStack: ["Python", "Scikit-learn", "Pandas", "Feature Engineering", "XGBoost", "Random Forest"],
      solution: "Applied rigorous EDA and feature engineering to handle missing values. Trained ensemble models (Random Forest, XGBoost) achieving 82% accuracy. Deployed on Kaggle with detailed documentation.",
      fullDescription: "A classic machine learning project that predicts Titanic passenger survival using various classification algorithms. This project demonstrates comprehensive data preprocessing, feature engineering, and model selection techniques. The analysis reveals key factors influencing survival rates and provides insights into the historical tragedy.",
      features: [
        "Comprehensive missing value imputation",
        "Advanced feature engineering",
        "Multiple model comparison",
        "Cross-validation for robust evaluation",
        "Feature importance analysis",
        "Detailed Kaggle notebook documentation"
      ],
      challenges: [
        "Significant missing data in Age and Cabin",
        "Feature extraction from Name and Ticket",
        "Preventing overfitting on small dataset",
        "Balancing model complexity and interpretability"
      ],
      results: [
        "82% prediction accuracy achieved",
        "Top 25% on Kaggle leaderboard",
        "Identified key survival factors",
        "Well-documented reproducible analysis"
      ],
      images: [
        "/project-images/titanic-1.png",
        "/project-images/titanic-2.png"
      ],
      demoVideo: "",
      githubUrl: "https://github.com/Jamshed-Ali-23/Titanic-dataset-Kaggle-Analysis-",
      liveUrl: "#"
    },
    {
      id: 6,
      title: "Multivariable Calculus Visualizer",
      icon: "📐",
      category: "Educational Tool",
      duration: "2 weeks",
      problem: "Making complex mathematical concepts like gradient descent and multivariable calculus intuitive for learning through interactive visualization.",
      techStack: ["Python", "SymPy", "Plotly", "Streamlit", "NumPy", "3D Visualization"],
      solution: "Built an interactive web app using Streamlit that visualizes 3D gradients, partial derivatives, and optimization algorithms with real-time parameter adjustment.",
      fullDescription: "An educational tool designed to help students understand multivariable calculus concepts through interactive 3D visualizations. Users can input custom functions, visualize gradients, contour plots, and see how optimization algorithms like gradient descent work in real-time. The tool bridges the gap between abstract mathematical concepts and intuitive understanding.",
      features: [
        "3D surface plot visualization",
        "Interactive gradient vector fields",
        "Contour plot generation",
        "Gradient descent animation",
        "Custom function input",
        "Parameter adjustment in real-time"
      ],
      challenges: [
        "Parsing and validating user-input functions",
        "Optimizing 3D rendering performance",
        "Creating smooth gradient descent animations",
        "Making complex math accessible to beginners"
      ],
      results: [
        "Interactive learning tool deployed",
        "Positive feedback from students",
        "Supports various calculus concepts",
        "Reusable for multiple math courses"
      ],
      images: [
        "/project-images/mvc-1.png",
        "/project-images/mvc-2.png"
      ],
      demoVideo: "",
      githubUrl: "https://github.com/Jamshed-Ali-23/MVC-Graph-Plotter",
      liveUrl: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <section id="projects" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/2 -left-40 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-amber-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 -right-40 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-orange-500/10 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="max-w-7xl mx-auto"
          >
            {/* Section Title */}
            <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-rose-400 bg-clip-text text-transparent">
                  Featured Data Science Projects
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-3xl mx-auto px-4">
                Case studies demonstrating my ability to identify business problems, select appropriate technologies, and deliver data-driven solutions.
              </p>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  delay={index * 0.1}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </motion.div>

            {/* CTA for more projects */}
            <motion.div
              variants={itemVariants}
              className="text-center mt-12 sm:mt-16 lg:mt-20 px-4"
            >
              <p className="text-stone-300 mb-6 sm:mb-8 text-base sm:text-lg">
                Explore more projects on my GitHub, including additional case studies in data visualization, SQL optimization, and machine learning.
              </p>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 sm:px-12 py-5 sm:py-7 text-base sm:text-lg shadow-xl shadow-amber-500/40 hover:shadow-amber-500/60 transition-all duration-300"
                  asChild
                >
                  <a href="https://github.com/Jamshed-Ali-23" target="_blank" rel="noopener noreferrer">
                    <Sparkles className="w-5 h-5 mr-2" />
                    View All Projects on GitHub
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
