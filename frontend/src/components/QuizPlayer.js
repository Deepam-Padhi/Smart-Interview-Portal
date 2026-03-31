import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questionAPI, resultAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const DEMO_QUESTIONS_BY_TOPIC = {
  'Java Foundation': [
    // Easy
    { question: 'What is the difference between JDK, JRE, and JVM?', optionA: 'JDK is for development, JRE is for running apps, JVM executes bytecode', optionB: 'They are different names for the same thing', optionC: 'JVM is only for web development', optionD: 'JRE cannot run compiled Java programs', correctAnswer: 'A', difficulty: 'easy' },
    { question: 'Which of the following is NOT a primitive data type in Java?', optionA: 'String', optionB: 'int', optionC: 'boolean', optionD: 'double', correctAnswer: 'A', difficulty: 'easy' },
    { question: 'What does OOP stand for?', optionA: 'Object-Oriented Programming', optionB: 'Object Output Protocol', optionC: 'Operational Optimization Protocol', optionD: 'Online Object Processing', correctAnswer: 'A', difficulty: 'easy' },
    // Medium
    { question: 'Which interface allows an object to be serialized to bytes?', optionA: 'Cloneable', optionB: 'Serializable', optionC: 'Comparable', optionD: 'Iterable', correctAnswer: 'B', difficulty: 'medium' },
    { question: 'What does the "final" keyword prevent?', optionA: 'Variable modification only', optionB: 'Method and variable modification only', optionC: 'Modification of classes, methods, and variables', optionD: 'Memory allocation', correctAnswer: 'C', difficulty: 'medium' },
    { question: 'In the context of exception handling, when is a "finally" block executed?', optionA: 'Only if an exception occurs', optionB: 'Only if no exception occurs', optionC: 'Always, whether exception occurs or not', optionD: 'Never in Java', correctAnswer: 'C', difficulty: 'medium' },
    // Hard
    { question: 'What is the time complexity of inserting an element at the beginning of an ArrayList?', optionA: 'O(1)', optionB: 'O(log n)', optionC: 'O(n)', optionD: 'O(n²)', correctAnswer: 'C', difficulty: 'hard' },
    { question: 'Which annotation is used to suppress specific compiler warnings in Java?', optionA: '@Override', optionB: '@Deprecated', optionC: '@SuppressWarnings', optionD: '@FunctionalInterface', correctAnswer: 'C', difficulty: 'hard' }
  ],
  'Cloud and DevOps': [
    // Easy
    { question: 'What does CI/CD stand for?', optionA: 'Continuous Integration/Continuous Deployment', optionB: 'Code Integration/Code Deployment', optionC: 'Central Infrastructure/Current Development', optionD: 'Continuous Installation/Continuous Download', correctAnswer: 'A', difficulty: 'easy' },
    { question: 'What is the main purpose of containerization with Docker?', optionA: 'To store data securely', optionB: 'To package applications with dependencies for consistent deployment', optionC: 'To replace operating systems', optionD: 'To manage user accounts', correctAnswer: 'B', difficulty: 'easy' },
    { question: 'Which of the following is NOT a cloud deployment model?', optionA: 'Public Cloud', optionB: 'Hybrid Cloud', optionC: 'Personal Cloud', optionD: 'Private Cloud', correctAnswer: 'C', difficulty: 'easy' },
    // Medium
    { question: 'What is Infrastructure as Code (IaC)?', optionA: 'Writing code only in cloud environments', optionB: 'Managing infrastructure through versioned code files instead of manual processes', optionC: 'A type of programming language', optionD: 'Software encryption method', correctAnswer: 'B', difficulty: 'medium' },
    { question: 'In blue-green deployment, what is the primary advantage?', optionA: 'Faster server processing', optionB: 'Reduced storage costs', optionC: 'Immediate rollback capability with zero downtime', optionD: 'Better color scheme for UI', correctAnswer: 'C', difficulty: 'medium' },
    { question: 'Which of these is a responsibility of the DevOps engineer?', optionA: 'Only writing application code', optionB: 'Only managing servers', optionC: 'Bridging development and operations through automation and monitoring', optionD: 'Designing user interfaces', correctAnswer: 'C', difficulty: 'medium' },
    // Hard
    { question: 'What is the difference between StatefulSet and Deployment in Kubernetes?', optionA: 'No difference', optionB: 'StatefulSet manages stateless pods, Deployment manages stateful pods', optionC: 'StatefulSet maintains pod identity and order; Deployment is for stateless applications', optionD: 'Deployments are faster than StatefulSets', correctAnswer: 'C', difficulty: 'hard' },
    { question: 'How does a rolling deployment strategy reduce downtime?', optionA: 'By stopping all services at once', optionB: 'By gradually replacing old instances with new ones while maintaining service availability', optionC: 'By duplicating all resources', optionD: 'Rolling deployments cannot reduce downtime', correctAnswer: 'B', difficulty: 'hard' }
  ],
  'Data Science': [
    // Easy
    { question: 'What is the purpose of the train-test split in machine learning?', optionA: 'To confuse the model', optionB: 'To evaluate model performance on unseen data', optionC: 'To increase training speed', optionD: 'To reduce memory usage', correctAnswer: 'B', difficulty: 'easy' },
    { question: 'Which metric is used to measure the accuracy of a classification model?', optionA: 'Mean Squared Error', optionB: 'Precision, Recall, and F1-Score', optionC: 'Root Mean Squared Error', optionD: 'Learning Rate', correctAnswer: 'B', difficulty: 'easy' },
    { question: 'What does normalization of data do?', optionA: 'Removes all negative values', optionB: 'Standardizes feature values to ensure fair comparison', optionC: 'Deletes duplicate records', optionD: 'Increases the size of the dataset', correctAnswer: 'B', difficulty: 'easy' },
    // Medium
    { question: 'What is the difference between precision and recall?', optionA: 'Precision measures accuracy among predicted positives; recall measures accuracy among actual positives', optionB: 'They are the same thing', optionC: 'Recall is always higher than precision', optionD: 'Precision is only for regression models', correctAnswer: 'A', difficulty: 'medium' },
    { question: 'Which of the following is a supervised learning algorithm?', optionA: 'K-Means Clustering', optionB: 'Decision Trees for classification', optionC: 'Hierarchical Clustering', optionD: 'Principal Component Analysis', correctAnswer: 'B', difficulty: 'medium' },
    { question: 'What is feature engineering?', optionA: 'The process of collecting raw data', optionB: 'Creating, transforming, and selecting variables to improve model performance', optionC: 'Deploying machine learning models', optionD: 'Writing code in Python only', correctAnswer: 'B', difficulty: 'medium' },
    // Hard
    { question: 'What is the purpose of cross-validation in model evaluation?', optionA: 'To increase training speed', optionB: 'To evaluate model robustness and reduce variance in performance estimates', optionC: 'To reduce the amount of data needed', optionD: 'To make models more complex', correctAnswer: 'B', difficulty: 'hard' },
    { question: 'What does "overfitting" mean in machine learning?', optionA: 'The model learns the training data too well, including noise, and performs poorly on unseen data', optionB: 'The model is too simple', optionC: 'The model runs out of memory', optionD: 'Using too many CPU cores', correctAnswer: 'A', difficulty: 'hard' }
  ],
  'Cybersecurity': [
    // Easy
    { question: 'What does the CIA triad stand for in cybersecurity?', optionA: 'Confidentiality, Integrity, and Availability', optionB: 'Control, Identity, and Access', optionC: 'Cybersecurity, Information, and Authentication', optionD: 'Central, Internal, and Automatic', correctAnswer: 'A', difficulty: 'easy' },
    { question: 'What is phishing?', optionA: 'A type of fish', optionB: 'A social engineering attack using deceptive emails to steal information', optionC: 'A firewall configuration', optionD: 'A network protocol', correctAnswer: 'B', difficulty: 'easy' },
    { question: 'What is the primary purpose of multi-factor authentication (MFA)?', optionA: 'To slow down users during login', optionB: 'To add multiple layers of security beyond password', optionC: 'To encrypt all traffic', optionD: 'To prevent all cyber attacks', correctAnswer: 'B', difficulty: 'easy' },
    // Medium
    { question: 'What does the principle of "least privilege" mean?', optionA: 'Give all users admin rights', optionB: 'Users should have only the minimum access necessary for their role', optionC: 'Privilege levels are not important', optionD: 'Only executives need access', correctAnswer: 'B', difficulty: 'medium' },
    { question: 'What is a vulnerability in cybersecurity?', optionA: 'A deliberate attack by hackers', optionB: 'A weakness that can be exploited by attackers', optionC: 'A type of antivirus software', optionD: 'A network speed test', correctAnswer: 'B', difficulty: 'medium' },
    { question: 'What does encryption do?', optionA: 'Speeds up network traffic', optionB: 'Converts readable data into coded form to protect it from unauthorized access', optionC: 'Stores data in the cloud', optionD: 'Deletes sensitive files', correctAnswer: 'B', difficulty: 'medium' },
    // Hard
    { question: 'What is the difference between symmetric and asymmetric encryption?', optionA: 'Symmetric uses one key, asymmetric uses two keys (public and private)', optionB: 'They are the same', optionC: 'Asymmetric is always faster', optionD: 'Symmetric cannot be cracked', correctAnswer: 'A', difficulty: 'hard' },
    { question: 'What is an incident response plan primarily focused on?', optionA: 'Preventing all attacks', optionB: 'Detecting, containing, and recovering from security incidents', optionC: 'Encrypting all data', optionD: 'Firing employees', correctAnswer: 'B', difficulty: 'hard' }
  ],
  'Salesforce Admin': [
    // Easy
    { question: 'What is a custom object in Salesforce?', optionA: 'A user-defined data structure to store organization-specific information', optionB: 'A standard feature only available to administrators', optionC: 'A type of report', optionD: 'A marketing automation tool', correctAnswer: 'A', difficulty: 'easy' },
    { question: 'What does a Salesforce profile control?', optionA: 'User appearance and themes', optionB: 'Object and field permissions, and login hours', optionC: 'Email distribution lists', optionD: 'Password reset frequency', correctAnswer: 'B', difficulty: 'easy' },
    { question: 'What is a validation rule in Salesforce?', optionA: 'A rule that encrypts data', optionB: 'A rule that enforces data quality by preventing invalid data from being saved', optionC: 'A type of workflow rule only', optionD: 'A backup mechanism', correctAnswer: 'B', difficulty: 'easy' },
    // Medium
    { question: 'What is the difference between a profile and a role in Salesforce?', optionA: 'Profiles and roles are the same', optionB: 'Profile controls permissions; role controls record visibility hierarchy', optionC: 'Role controls permissions; profile controls themes', optionD: 'They both do the same thing with different names', correctAnswer: 'B', difficulty: 'medium' },
    { question: 'What is a field-level security in Salesforce?', optionA: 'Controls at what time users can access records', optionB: 'Allows users to view/edit specific fields based on their profile and permissions', optionC: 'A method to encrypt email addresses', optionD: 'Prevents all data access', correctAnswer: 'B', difficulty: 'medium' },
    { question: 'What is a workflow rule primarily used for?', optionA: 'Writing code', optionB: 'Automating field updates, alerts, tasks, and outbound messages based on criteria', optionC: 'Storing documents', optionD: 'Email management only', correctAnswer: 'B', difficulty: 'medium' },
    // Hard
    { question: 'What is the purpose of the role hierarchy in Salesforce?', optionA: 'To organize team structure visually', optionB: 'To control record visibility; users above in hierarchy see records of users below', optionC: 'To assign email addresses', optionD: 'To prevent data entry', correctAnswer: 'B', difficulty: 'hard' },
    { question: 'What is a record type in Salesforce used for?', optionA: 'To define the color of records', optionB: 'To provide different page layouts, picklist values, and business processes for different users', optionC: 'To lock records permanently', optionD: 'To delete duplicate records', correctAnswer: 'B', difficulty: 'hard' }
  ],
  'Apex Development': [
    // Easy
    { question: 'What is Apex in Salesforce?', optionA: 'A visual tool for creating forms', optionB: 'A strongly-typed, object-oriented programming language for Salesforce backend logic', optionC: 'A cloud storage service', optionD: 'A reporting tool only', correctAnswer: 'B', difficulty: 'easy' },
    { question: 'What is a trigger in Apex?', optionA: 'A button that users click', optionB: 'Code that executes before or after DML events (insert, update, delete) on records', optionC: 'A scheduled job', optionD: 'An external API call', correctAnswer: 'B', difficulty: 'easy' },
    { question: 'What does SOQL stand for?', optionA: 'Salesforce Object Query Language', optionB: 'Secure Object Query Layer', optionC: 'Salesforce Operating Query Library', optionD: 'Standard Object Query Logic', correctAnswer: 'A', difficulty: 'easy' },
    // Medium
    { question: 'What are governor limits in Salesforce?', optionA: 'Limits set by system administrators on user access', optionB: 'Runtime limits enforcing resource usage to ensure multi-tenant platform stability', optionC: 'Marketing campaign budgets', optionD: 'Storage space for files', correctAnswer: 'B', difficulty: 'medium' },
    { question: 'What is a batch Apex class used for?', optionA: 'Processing a small number of records', optionB: 'Processing a large number of records asynchronously in chunks', optionC: 'Creating user accounts', optionD: 'Sending bulk emails only', correctAnswer: 'B', difficulty: 'medium' },
    { question: 'What is the minimum test code coverage required for deployment in Salesforce?', optionA: '10%', optionB: '25%', optionC: '75%', optionD: '95%', correctAnswer: 'C', difficulty: 'medium' },
    // Hard
    { question: 'What is the purpose of the "bulkify" pattern in Apex?', optionA: 'To make code run faster always', optionB: 'To operate on multiple records in a single operation instead of individual records to avoid governor limits', optionC: 'To create large files', optionD: 'To bulk delete records', correctAnswer: 'B', difficulty: 'hard' },
    { question: 'What does an @future annotation do in Apex?', optionA: 'Predicts future results', optionB: 'Marks a method as asynchronous, executing in a separate thread after current execution', optionC: 'Prevents method execution', optionD: 'Only works for batch jobs', correctAnswer: 'B', difficulty: 'hard' }
  ]
};

const QuizPlayer = () => {
  const { courseId, topic, difficulty } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const getDemoQuestions = useCallback(() => {
    const decodedTopic = decodeURIComponent(topic);
    const questionSet = DEMO_QUESTIONS_BY_TOPIC[decodedTopic] || [];
    return questionSet.filter((q) => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  }, [difficulty, topic]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        // Fetch questions directly by courseId, topic, and difficulty
        const response = await questionAPI.getByTopic(courseId, decodeURIComponent(topic), difficulty);
        const fetchedQuestions = Array.isArray(response.data) ? response.data : [];
        
        console.log('Fetched questions from API:', fetchedQuestions);
        
        const effectiveQuestions = fetchedQuestions.length > 0 ? fetchedQuestions : getDemoQuestions();
        setQuestions(effectiveQuestions);
        // Timer: 90 seconds per question, minimum 2 minutes.
        setTimeLeft(Math.max(effectiveQuestions.length * 90, 120));
      } catch (err) {
        const fallbackQuestions = getDemoQuestions();
        setQuestions(fallbackQuestions);
        setTimeLeft(Math.max(fallbackQuestions.length * 90, 120));
        setError('Showing sample questions for this topic.');
        console.error('Failed to fetch questions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [courseId, topic, difficulty, getDemoQuestions]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionLetter) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionLetter
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = useCallback(async () => {
    try {
      setSubmitted(true);
      let correct = 0;

      questions.forEach((q, index) => {
        const selectedAnswer = answers[index];
        if (selectedAnswer === q.correctAnswer) {
          correct++;
        }
      });

      const result = {
        userId: user?.id || user?.userId,
        courseId,
        topic: decodeURIComponent(topic),
        difficulty,
        score: correct,
        total: questions.length,
        percentage: Math.round((correct / questions.length) * 100)
      };

      await resultAPI.create(result);
      
      navigate(`/result/${courseId}`, {
        state: { score: correct, total: questions.length }
      });
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      console.error('Failed to submit quiz:', err);
    }
  }, [answers, courseId, difficulty, navigate, questions, topic, user]);

  // Timer effect
  useEffect(() => {
    if (timeLeft === null || submitted) {
      return;
    }
    if (timeLeft <= 0 && questions.length > 0) {
      handleSubmitQuiz();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [handleSubmitQuiz, questions.length, submitted, timeLeft]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="error-container">
        <h2>No questions available</h2>
        <p>Please select another topic or difficulty level.</p>
        <button
          className="select-btn"
          onClick={() => navigate('/quiz')}
        >
          Back to Quiz Selection
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const options = [
    question.optionA,
    question.optionB,
    question.optionC,
    question.optionD
  ];
  const selectedAnswer = answers[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-player">
      <div className="quiz-header">
        <div className="quiz-info">
          <h2>
            {decodeURIComponent(topic)} - {difficulty}
          </h2>
          <p>Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className="quiz-timer" style={{
          color: timeLeft < 45 ? '#ef4444' : '#2563eb'
        }}>
          ⏱️ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`
          }}
        ></div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="question-container">
        <h3 className="question-text">{question.question}</h3>

        <div className="options-grid">
          {options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === String.fromCharCode(65 + index) ? 'selected' : ''
              }`}
              onClick={() => handleSelectOption(String.fromCharCode(65 + index))}
            >
              <span className="option-label">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-actions">
        <button
          className="nav-btn"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>

        <div className="question-counter">
          {currentQuestion + 1} / {questions.length}
        </div>

        {currentQuestion === questions.length - 1 ? (
          <button
            className="submit-btn"
            onClick={handleSubmitQuiz}
            disabled={submitted}
          >
            {submitted ? 'Submitting...' : 'Submit Quiz'}
          </button>
        ) : (
          <button
            className="nav-btn"
            onClick={handleNext}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPlayer;