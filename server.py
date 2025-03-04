from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Add CORS middleware to allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend running on localhost:3000
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Define Pydantic model for input validation
class Link(BaseModel):
    meetingLink: str

@app.post("/verify-meeting")
async def verify_meeting(link: Link):
    # Check if the meeting link starts with the correct prefix for Google Meet
    if link.meetingLink.startswith('https://meet.google.com/'):
        return {"isValid": True}
    else:
        return {"isValid": False}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
