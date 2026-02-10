import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Import models
import User from '../models/User';
import Profile from '../models/Profile';
import Project from '../models/Project';
import SkillCategory from '../models/SkillCategory';
import Certificate from '../models/Certificate';
import Experience from '../models/Experience';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function seed() {
  try {
    console.log('🌱 Starting database seed...\n');

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      Project.deleteMany({}),
      SkillCategory.deleteMany({}),
      Certificate.deleteMany({}),
      Experience.deleteMany({}),
    ]);
    console.log('✅ Existing data cleared\n');

    // Create admin user
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await User.create({
      email: 'admin@jamshedali.dev',
      password: hashedPassword,
      role: 'admin',
    });
    console.log('✅ Admin user created (email: admin@jamshedali.dev, password: admin123)\n');

    // Create profile
    console.log('📝 Creating profile...');
    await Profile.create({
      name: 'Jamshed Ali',
      title: 'Data Scientist & Analytics Expert',
      bio: 'A passionate Data Science student combining analytical expertise with modern web development skills. I transform complex data into actionable insights using Python, Power BI, SQL, and Machine Learning, with a unique edge in building interactive dashboards and web applications.',
      email: 'jamshedsaiin@gmail.com',
      location: 'Islamabad, Pakistan',
      socialLinks: {
        github: 'https://github.com/Jamshed-Ali-23',
        linkedin: 'https://linkedin.com/in/jamshedali23',
        twitter: '',
        email: 'jamshedsaiin@gmail.com',
      },
      education: {
        degree: 'BS Computer Science',
        institution: 'Air University, Islamabad',
        year: '2022 - 2026',
        description: 'Focused on Data Science, Machine Learning, and Analytics. Combining theoretical knowledge with practical project experience.',
      },
      coursework: ['Linear Algebra', 'Probability & Statistics', 'Calculus', 'Discrete Mathematics'],
      strengths: ['Problem-Solving', 'Fast Learner', 'Team Player', 'Data-Driven'],
      stats: {
        projectsCompleted: 6,
        certificationsEarned: 6,
        technologiesMastered: 18,
      },
    });
    console.log('✅ Profile created\n');

    // Create projects
    console.log('🚀 Creating projects...');
    const projectsData = [
      {
        title: 'Asia Cup 2025 Predictor',
        category: 'Machine Learning',
        icon: 'TrendingUp',
        problem: 'Cricket fans and analysts needed data-driven match predictions for the Asia Cup tournament.',
        solution: 'Built a machine learning prediction system using historical match data, player statistics, and venue analysis to forecast match outcomes with high accuracy.',
        techStack: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'NumPy', 'Plotly'],
        features: [
          'Real-time match predictions',
          'Player performance analysis',
          'Head-to-head statistics',
          'Interactive data visualizations',
          'Historical match trends',
        ],
        challenges: [
          'Handling missing historical data for newer players',
          'Balancing multiple prediction factors (weather, venue, form)',
          'Creating intuitive visualizations for complex statistics',
        ],
        results: [
          '75% prediction accuracy on test matches',
          '500+ active users during Asia Cup',
          'Featured in local tech community showcase',
        ],
        images: ['/project-images/Asia Cup/1.PNG', '/project-images/Asia Cup/2.PNG', '/project-images/Asia Cup/3.PNG'],
        githubUrl: 'https://github.com/Jamshed-Ali-23/asia-cup-predictor',
        liveUrl: 'https://asia-cup-predictor.streamlit.app',
        isVisible: true,
        order: 1,
      },
      {
        title: 'Customer Segmentation (RFM)',
        category: 'Data Analytics',
        icon: 'PieChart',
        problem: 'E-commerce businesses struggle to understand customer behavior and create targeted marketing strategies.',
        solution: 'Implemented RFM (Recency, Frequency, Monetary) analysis to segment customers into actionable groups, enabling personalized marketing campaigns.',
        techStack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'K-Means'],
        features: [
          'Automated RFM score calculation',
          'K-Means clustering for segmentation',
          'Customer lifetime value prediction',
          'Segment-wise behavior analysis',
          'Marketing recommendation engine',
        ],
        challenges: [
          'Handling large transaction datasets efficiently',
          'Determining optimal number of customer segments',
          'Creating actionable insights from statistical analysis',
        ],
        results: [
          'Identified 5 distinct customer segments',
          '30% improvement in marketing ROI',
          'Reduced customer churn by 15%',
        ],
        images: [],
        githubUrl: 'https://github.com/Jamshed-Ali-23/customer-segmentation-rfm',
        isVisible: true,
        order: 2,
      },
      {
        title: 'Retail Insights Dashboard',
        category: 'Business Intelligence',
        icon: 'BarChart3',
        problem: 'Retail managers needed real-time visibility into sales performance, inventory levels, and customer trends.',
        solution: 'Created an interactive Power BI dashboard with drill-down capabilities, automated data refresh, and KPI tracking for comprehensive retail analytics.',
        techStack: ['Power BI', 'DAX', 'SQL', 'Excel', 'Power Query'],
        features: [
          'Real-time sales tracking',
          'Inventory management insights',
          'Customer demographic analysis',
          'Predictive sales forecasting',
          'Mobile-responsive design',
        ],
        challenges: [
          'Integrating multiple data sources (POS, inventory, CRM)',
          'Optimizing DAX queries for large datasets',
          'Designing intuitive navigation for non-technical users',
        ],
        results: [
          '40% faster decision-making',
          'Reduced stockouts by 25%',
          'Adopted by 3 retail chains',
        ],
        images: [],
        githubUrl: '',
        isVisible: true,
        order: 3,
      },
      {
        title: 'Walmart Sales Forecasting',
        category: 'Machine Learning',
        icon: 'TrendingUp',
        problem: 'Accurate sales forecasting is crucial for inventory management and resource allocation in large retail operations.',
        solution: 'Developed time-series forecasting models using historical Walmart sales data to predict future sales with consideration for holidays and economic factors.',
        techStack: ['Python', 'Pandas', 'Prophet', 'Scikit-learn', 'XGBoost', 'Plotly'],
        features: [
          'Multi-store sales prediction',
          'Holiday impact analysis',
          'Economic indicator integration',
          'Automated model retraining',
          'Confidence interval visualization',
        ],
        challenges: [
          'Handling seasonality and holiday effects',
          'Incorporating external economic factors',
          'Scaling predictions across multiple stores',
        ],
        results: [
          '89% forecast accuracy (MAPE < 11%)',
          'Reduced inventory costs by 20%',
          'Improved staff scheduling efficiency',
        ],
        images: [],
        githubUrl: 'https://github.com/Jamshed-Ali-23/walmart-sales-forecast',
        isVisible: true,
        order: 4,
      },
      {
        title: 'Titanic Survival Prediction',
        category: 'Machine Learning',
        icon: 'Brain',
        problem: 'Classic machine learning challenge to predict passenger survival based on various demographic and ticket features.',
        solution: 'Built and compared multiple classification models with extensive feature engineering and hyperparameter tuning to achieve optimal prediction accuracy.',
        techStack: ['Python', 'Scikit-learn', 'Pandas', 'Seaborn', 'XGBoost', 'Random Forest'],
        features: [
          'Comprehensive EDA with visualizations',
          'Advanced feature engineering',
          'Multiple model comparison',
          'Cross-validation and tuning',
          'Interpretable model explanations',
        ],
        challenges: [
          'Handling missing data (age, cabin)',
          'Feature engineering from text fields',
          'Avoiding overfitting on small dataset',
        ],
        results: [
          'Top 10% Kaggle leaderboard score',
          '82% prediction accuracy',
          'Comprehensive documentation for learning',
        ],
        images: [],
        githubUrl: 'https://github.com/Jamshed-Ali-23/titanic-ml',
        isVisible: true,
        order: 5,
      },
      {
        title: 'Multivariable Calculus Visualizer',
        category: 'Education',
        icon: 'Code2',
        problem: 'Students struggle to visualize and understand 3D mathematical concepts in multivariable calculus courses.',
        solution: 'Created an interactive web application for visualizing 3D surfaces, vector fields, and calculus operations with intuitive controls.',
        techStack: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Plotly.js'],
        features: [
          'Interactive 3D surface plots',
          'Vector field visualization',
          'Gradient and contour mapping',
          'Animation controls',
          'Educational explanations',
        ],
        challenges: [
          'Rendering complex 3D graphics performantly',
          'Creating intuitive mathematical input',
          'Balancing accuracy with visual clarity',
        ],
        results: [
          'Used by 200+ students',
          'Improved concept understanding by 40%',
          'Positive feedback from professors',
        ],
        images: [],
        githubUrl: 'https://github.com/Jamshed-Ali-23/calculus-visualizer',
        liveUrl: 'https://calculus-visualizer.vercel.app',
        isVisible: true,
        order: 6,
      },
    ];

    await Project.insertMany(projectsData);
    console.log(`✅ ${projectsData.length} projects created\n`);

    // Create skill categories
    console.log('💡 Creating skill categories...');
    const skillsData = [
      {
        title: 'Core Technologies',
        icon: 'Database',
        description: 'Foundational tools for data manipulation and visualization',
        skills: [
          { name: 'Python', level: 5 },
          { name: 'SQL', level: 5 },
          { name: 'Power BI', level: 5 },
          { name: 'DAX', level: 4 },
          { name: 'Pandas', level: 5 },
          { name: 'NumPy', level: 4 },
          { name: 'Excel', level: 4 },
          { name: 'Power Query', level: 4 },
        ],
        isVisible: true,
        order: 1,
      },
      {
        title: 'ML & Analytics',
        icon: 'Brain',
        description: 'Machine learning algorithms and advanced analytics techniques',
        skills: [
          { name: 'Scikit-learn', level: 4 },
          { name: 'K-Means', level: 4 },
          { name: 'RFM Analysis', level: 4 },
          { name: 'Time Series', level: 3 },
          { name: 'XGBoost', level: 3 },
          { name: 'Prophet', level: 3 },
          { name: 'Classification', level: 4 },
          { name: 'Regression', level: 4 },
        ],
        isVisible: true,
        order: 2,
      },
      {
        title: 'Engineering Edge',
        icon: 'Code2',
        description: 'Development tools and frameworks for building applications',
        skills: [
          { name: 'React', level: 4 },
          { name: 'Streamlit', level: 5 },
          { name: 'Git', level: 4 },
          { name: 'Plotly', level: 4 },
          { name: 'TypeScript', level: 3 },
          { name: 'Tailwind CSS', level: 4 },
          { name: 'Three.js', level: 3 },
          { name: 'Next.js', level: 3 },
        ],
        isVisible: true,
        order: 3,
      },
    ];

    await SkillCategory.insertMany(skillsData);
    console.log(`✅ ${skillsData.length} skill categories created\n`);

    // Create certificates
    console.log('🏆 Creating certificates...');
    const certificatesData = [
      {
        title: 'AWS Cloud Practitioner Essentials',
        platform: 'Amazon Web Services',
        issueDate: new Date('2024-01-15'),
        credentialId: 'AWS-CP-2024-001',
        credentialUrl: 'https://aws.amazon.com/verify/credentials',
        skills: ['AWS', 'Cloud Computing', 'Infrastructure'],
        color: 'amber',
        isVisible: true,
        order: 1,
      },
      {
        title: 'Machine Learning Fundamentals',
        platform: 'Coursera (Stanford)',
        issueDate: new Date('2023-11-20'),
        credentialId: 'COURSERA-ML-2023',
        credentialUrl: 'https://coursera.org/verify',
        skills: ['Machine Learning', 'Neural Networks', 'Python'],
        color: 'blue',
        isVisible: true,
        order: 2,
      },
      {
        title: 'Data Science Professional',
        platform: 'DataCamp',
        issueDate: new Date('2023-09-10'),
        credentialId: 'DC-DS-PRO-2023',
        credentialUrl: 'https://datacamp.com/verify',
        skills: ['Data Science', 'Python', 'Statistics'],
        color: 'green',
        isVisible: true,
        order: 3,
      },
      {
        title: 'Google Data Analytics',
        platform: 'Google',
        issueDate: new Date('2023-07-05'),
        credentialId: 'GOOGLE-DA-2023',
        credentialUrl: 'https://grow.google/certificates',
        skills: ['Data Analytics', 'SQL', 'Visualization'],
        color: 'purple',
        isVisible: true,
        order: 4,
      },
      {
        title: 'Meta Frontend Developer',
        platform: 'Meta',
        issueDate: new Date('2023-05-15'),
        credentialId: 'META-FE-2023',
        credentialUrl: 'https://coursera.org/verify',
        skills: ['React', 'JavaScript', 'CSS'],
        color: 'cyan',
        isVisible: true,
        order: 5,
      },
      {
        title: 'IBM Machine Learning with Python',
        platform: 'IBM',
        issueDate: new Date('2023-03-20'),
        credentialId: 'IBM-ML-PY-2023',
        credentialUrl: 'https://ibm.com/verify',
        skills: ['Machine Learning', 'Python', 'Data Analysis'],
        color: 'rose',
        isVisible: true,
        order: 6,
      },
    ];

    await Certificate.insertMany(certificatesData);
    console.log(`✅ ${certificatesData.length} certificates created\n`);

    // Create experience
    console.log('💼 Creating experience...');
    await Experience.create({
      role: 'Data Analytics Intern',
      company: 'Elevvo Pathways',
      startDate: new Date('2024-01-01'),
      isCurrent: true,
      location: 'Islamabad, Pakistan',
      description: 'Working on data analytics projects, building dashboards, and implementing ML solutions for business insights.',
      achievements: [
        'Developed automated reporting dashboards reducing manual work by 60%',
        'Implemented customer segmentation model improving targeting accuracy by 35%',
        'Created data pipelines for real-time analytics processing',
        'Collaborated with cross-functional teams on data-driven decision making',
      ],
      technologies: ['Python', 'Power BI', 'SQL', 'Pandas', 'Scikit-learn'],
      isVisible: true,
      order: 1,
    });
    console.log('✅ Experience created\n');

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📋 Summary:');
    console.log('   - 1 Admin user (admin@jamshedali.dev / admin123)');
    console.log('   - 1 Profile');
    console.log(`   - ${projectsData.length} Projects`);
    console.log(`   - ${skillsData.length} Skill Categories`);
    console.log(`   - ${certificatesData.length} Certificates`);
    console.log('   - 1 Experience entry');
    console.log('\n🚀 You can now start the application with: npm run dev');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
