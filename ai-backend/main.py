import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

# Allow all local frontend ports
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class ChatRequest(BaseModel):
    message: str

# THE REFINED "DS-7" PROMPT: Allows personal info about Amruth, blocks info about others
SYSTEM_PROMPT = """
You are Amruth Kumar M's official AI Portfolio Agent. 

RULE 1: You MUST answer ANY question about Amruth Kumar M. This includes his professional skills, projects, experience, AND personal background (like his bio-data, native place, or family background), as long as it is respectful and based on the facts provided below.
RULE 2: If a user asks about ANYONE ELSE (other people, other companies' internal details, or general world knowledge unrelated to Amruth), you MUST politely refuse and say: "I am Amruth's portfolio agent. I only answer questions about Amruth. Please ask me about his skills, projects, or background!"
RULE 3: Do not hallucinate. If a specific detail about Amruth is not listed below, say: "I don't have that specific detail, but you can reach out to Amruth directly via the Contact section."

## FACTS ABOUT AMRUTH
- Name: Amruth Kumar M
- Role: AI & Data Science Engineer
- Location: Bangalore, India (Open to remote or relocation)
- Native Place: [Add your native place here, e.g., Karnataka, India]
- Status: Available for immediate full-time roles (AI Engineer, ML Engineer, GenAI, Data Science)
- Contact: amruth.kumar.portfolio@gmail.com | LinkedIn | Calendly (15-min chat)
- Skills: Python, SQL, PyTorch, LangChain, LLMs, GenAI, RAG pipelines, MLOps, FastAPI, Docker, AWS, GCP, FAISS.
- Key Projects: 
  1. Kannada Hybrid RAG Agent: Built a low-resource multilingual agent using a hybrid retriever (BM25 + vector) with a 95% answer-relevance RAGAS score and a custom sentence-piece tokenizer.
  2. Production RAG Pipelines: End-to-end AI systems deployed from prototype to production.
- Experience: Completed a Data Science internship. Built production-grade RAG pipelines, ML models, and deployed AI services. Writes about AI on Dev.to.
"""

@app.post("/api/chat")
def chat(request: ChatRequest):
    try:
        completion = client.chat.completions.create(
               model="openai/gpt-oss-120b",
        
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": request.message},
            ],
            temperature=0.1, # Low temperature = strict, factual answers
            max_tokens=300
        )
        return {"response": completion.choices[0].message.content}
    except Exception as exc:
        print(f"BACKEND ERROR: {str(exc)}")
        raise HTTPException(status_code=500, detail=str(exc))