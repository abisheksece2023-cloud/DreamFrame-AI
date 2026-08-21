# 🌌 DreamFrame AI

> **An always-on creative agent that autonomously generates and publishes a new futuristic artwork every day.**

---

## 🎯 About DreamFrame AI

**DreamFrame AI** is an autonomous creative agent designed to generate a fresh futuristic artwork every day without manual user interaction.

The agent runs automatically at **8:00 AM IST**, selects a creative concept, generates an image, stores the resulting artwork and metadata in Amazon S3, and publishes the latest creation through a live static website.

The goal is simple:

> **The best creative tool is the one you never have to open.**

Instead of requiring users to request new content, DreamFrame AI proactively creates something new and has it ready when they return.

### Example Daily Concepts

* 🏙️ Floating smart cities
* 🚀 AI-powered space colonies
* 🌊 Underwater futuristic cities
* 🤖 Autonomous robotic ecosystems
* 🌱 Technology-powered nature
* 🛰️ Future space stations

---

## 🏗️ Architecture

```text
                 ┌─────────────────────────┐
                 │ Amazon EventBridge      │
                 │ Scheduler               │
                 │                         │
                 │ Daily at 8:00 AM IST    │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ AWS Lambda              │
                 │                         │
                 │ Node.js Agent           │
                 │ Creative Decision Logic │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ Pollinations.ai         │
                 │                         │
                 │ AI Image Generation     │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ Amazon S3               │
                 │                         │
                 │ • Generated Images      │
                 │ • Metadata              │
                 │ • latest.json           │
                 │ • Website               │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ 🌐 DreamFrame Website   │
                 │                         │
                 │ Latest Daily Artwork    │
                 └─────────────────────────┘
```

### Execution Flow

```text
⏰ Scheduled Trigger
        ↓
⚡ Lambda Invocation
        ↓
🧠 Creative Concept Selection
        ↓
🎨 AI Image Generation
        ↓
📦 Store Image + Metadata
        ↓
🌐 Publish Latest Creation
        ↓
🔄 Wait Until Next Scheduled Run
```

---

## ☁️ AWS Services Used

| AWS Service                      | Role in DreamFrame AI                            |
| -------------------------------- | ------------------------------------------------ |
| **AWS Lambda**                   | Runs the autonomous creative agent               |
| **Amazon EventBridge Scheduler** | Triggers the agent automatically every day       |
| **Amazon S3**                    | Stores generated artwork and hosts the website   |
| **AWS IAM**                      | Provides controlled permissions for AWS services |
| **Amazon CloudWatch**            | Provides Lambda execution logs and monitoring    |

### External Service

| Service             | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| **Pollinations.ai** | Generates the AI artwork from creative prompts |

> DreamFrame AI currently uses Pollinations.ai for image generation. AWS services provide the scheduling, serverless execution, storage, hosting, and operational infrastructure.

---

## ⚙️ How It Works

### 1. ⏰ Automatic Trigger

Amazon EventBridge Scheduler invokes the Lambda function every day at **8:00 AM IST**.

### 2. 🧠 Creative Decision

Lambda selects the day's futuristic concept from the project's creative theme library.

The concept can combine elements such as:

* Technology
* Environment
* Location
* Mood
* Future scenario

### 3. 🎨 Image Generation

Lambda creates a descriptive image prompt and sends it to the image-generation service.

### 4. 📦 Storage

The generated artwork and associated metadata are uploaded to Amazon S3.

Example metadata:

```json
{
  "date": "2026-08-21",
  "title": "A Floating Smart City Above Chennai",
  "category": "Future Cities",
  "generatedAt": "2026-08-21T08:00:00+05:30"
}
```

### 5. 🌐 Automatic Publishing

The website reads the latest generated content from S3 and displays the new artwork automatically.

### 6. 🔄 Continuous Operation

After deployment, the system continues generating new artwork according to the configured schedule without requiring daily manual interaction.

---

## ✨ Key Features

| Feature                        | Description                                          |
| ------------------------------ | ---------------------------------------------------- |
| 🤖 **Autonomous Agent**        | Generates creative content without manual initiation |
| 📅 **Daily Creation**          | Produces a new futuristic artwork every day          |
| 🎨 **AI-Generated Visuals**    | Converts creative concepts into visual artwork       |
| ⏰ **Scheduled Automation**     | EventBridge triggers the workflow automatically      |
| ☁️ **Serverless Architecture** | Runs using managed AWS services                      |
| 🌐 **Live Website**            | Publishes the latest artwork automatically           |
| 📦 **Persistent Storage**      | Stores images and metadata in Amazon S3              |
| 🧠 **Creative Theme Engine**   | Uses multiple futuristic concepts for varied output  |
| 📱 **Responsive UI**           | Designed for desktop and mobile viewing              |
| 🔐 **IAM-Based Access**        | Uses AWS IAM for controlled service permissions      |

---

## 📁 Project Structure

```text
DreamFrame-AI/
│
├── lambda/
│   ├── index.mjs
│   │   └── Main Lambda function and agent logic
│   │
│   └── package.json
│       └── Node.js dependencies
│
├── website/
│   ├── index.html
│   │   └── DreamFrame frontend
│   │
│   └── error.html
│       └── Website error page
│
├── trust-policy.json
│   └── Lambda IAM trust policy
│
├── lambda-policy.json
│   └── Lambda permissions
│
├── bucket-policy.json
│   └── S3 website access policy
│
├── cors.json
│   └── S3 CORS configuration
│
└── README.md
    └── Project documentation
```

---

## 🚀 Deployment

### Prerequisites

* AWS Account
* AWS CLI
* Node.js 18+
* Git
* PowerShell / Terminal
* Configured AWS credentials

Verify AWS CLI:

```bash
aws --version
```

Verify your AWS account:

```bash
aws sts get-caller-identity
```

### 1. Clone the Repository

```bash
git clone https://github.com/abisheksece2023-cloud/DreamFrame-AI.git
cd DreamFrame-AI
```

### 2. Install Dependencies

```bash
cd lambda
npm install
```

### 3. Create the S3 Bucket

Replace `your-bucket-name` with a globally unique bucket name:

```bash
aws s3 mb s3://your-bucket-name --region ap-south-1
```

Configure static website hosting:

```bash
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document error.html
```

### 4. Package the Lambda Function

From the `lambda` directory:

```powershell
Compress-Archive -Path * -DestinationPath ../lambda-package.zip -Force
```

### 5. Create the Lambda IAM Role

```bash
aws iam create-role \
  --role-name DreamFrameAI-Lambda-Role \
  --assume-role-policy-document file://trust-policy.json
```

Attach the required permissions defined by the project.

> For production deployments, use least-privilege IAM policies instead of broad permissions.

### 6. Deploy Lambda

Replace `YOUR_ACCOUNT_ID` with your AWS account ID:

```bash
aws lambda create-function \
  --function-name DreamFrameAI-Generator \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/DreamFrameAI-Lambda-Role \
  --handler index.handler \
  --zip-file fileb://lambda-package.zip \
  --timeout 120 \
  --memory-size 512
```

### 7. Configure the Daily Trigger

For **8:00 AM IST**, use the `Asia/Kolkata` timezone when configuring EventBridge Scheduler.

```text
Daily:
08:00 AM
Asia/Kolkata
```

> If using a UTC-based EventBridge rule instead, 8:00 AM IST corresponds to 02:30 UTC.

### 8. Upload the Website

```bash
aws s3 cp website/index.html \
  s3://your-bucket-name/index.html \
  --content-type "text/html"
```

Upload additional website assets as required.

### 9. Test the Agent

```bash
aws lambda invoke \
  --function-name DreamFrameAI-Generator \
  --payload "{}" \
  output.json
```

Check the Lambda logs in **Amazon CloudWatch** if the invocation fails.

---

## 🔐 Security

DreamFrame AI follows basic AWS security practices:

* AWS IAM roles are used for service access.
* AWS credentials are not stored in source code.
* Sensitive configuration should be stored using environment variables or AWS Secrets Manager where appropriate.
* S3 permissions should be limited to the resources required by the application.
* CloudWatch logs can be used for monitoring and debugging.

> Never commit AWS access keys, secret keys, tokens, or other credentials to GitHub.

---

## 🔮 Future Enhancements

### 🧠 Amazon Bedrock Integration

Integrate Amazon Bedrock for AI-powered concept generation, prompt refinement, and creative decision-making.

### 🎨 Advanced Image Generation

Support multiple image-generation models and allow the agent to select the most suitable model based on the day's concept.

### 🧬 Adaptive Creativity

Allow the agent to analyse previous creations and avoid repetitive themes over time.

### 🌦️ Context-Aware Creation

Generate artwork based on external context such as:

* Weather
* Season
* Day of the week
* Global events
* Technology trends

### 📱 Mobile Application

Create a Progressive Web App or mobile application for accessing the daily artwork.

### 🔔 Daily Notifications

Notify users whenever a new DreamFrame creation is published.

### 🖼️ Gallery & Archive

Build a searchable gallery containing all previous daily creations.

### 🌍 Multi-Language Support

Allow creative concepts and descriptions to be generated in multiple languages.

---

## 🏆 AWS Builder Center Challenge

DreamFrame AI was created for the:

**AWS Builder Center Weekend Challenge: Set Your Creative App Free**

### Challenge Prompt

> *"Turn your creative app into an always-on agent that makes something new on its own and has it ready when you return."*

DreamFrame AI addresses this prompt by automatically creating and publishing a new piece of futuristic artwork every day without requiring the user to initiate the generation process.

---

## 👨‍💻 Author

**Abishek S**

---

## 🔗 Demo & Resources

* 🌐 **Live Website:** [DreamFrame AI](http://dreamframe-ai-bucket.s3-website.ap-south-1.amazonaws.com/)
* 💻 **GitHub:** [DreamFrame AI Repository](https://github.com/abisheksece2023-cloud/DreamFrame-AI)



### 🌌 DreamFrame AI

**Imagine. Generate. Automate.**
