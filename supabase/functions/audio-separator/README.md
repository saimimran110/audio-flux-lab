# Audio Separator Edge Function

## Setup Instructions

### 1. Install Supabase CLI
```bash
npm install -g supabase
```

### 2. Initialize Supabase (if not done)
```bash
supabase init
```

### 3. Start local development
```bash
supabase start
```

### 4. Deploy the function
```bash
supabase functions deploy audio-separator
```

## Where to Add Your Python Algorithm

### Option 1: Python Subprocess (Recommended)
1. Add your Python algorithm to `python_algorithm.py`
2. Install required dependencies in the Edge Function environment
3. Use Deno's subprocess to call your Python script

### Option 2: Convert to TypeScript
1. Convert your Python algorithm to TypeScript
2. Add the logic directly in `index.ts`

### Option 3: External Python API
1. Host your Python algorithm on a separate server
2. Call it from the Edge Function via HTTP

## File Structure
```
supabase/functions/audio-separator/
├── index.ts              # Main Edge Function (YAHAN MAIN CODE HAI)
├── python_algorithm.py   # YAHAN APKA PYTHON ALGORITHM LAGEGA
└── README.md            # This file
```

## Environment Variables
Add these to your Supabase project settings:
- `PYTHON_PATH`: Path to Python executable
- Any other environment variables your algorithm needs

## Testing
```bash
# Test locally
curl -X POST http://localhost:54321/functions/v1/audio-separator \
  -H "Content-Type: multipart/form-data" \
  -F "audio=@test-audio.mp3"
```

## Important Notes
1. **APKA MAIN CODE** `python_algorithm.py` mein lagega
2. **Edge Function** automatically call karega apka algorithm
3. **Frontend** already connected hai Edge Function se
4. **File Upload/Download** Supabase Storage use karta hai

## Next Steps
1. Add your Python algorithm to `python_algorithm.py`
2. Install dependencies if needed
3. Test with a sample audio file
4. Deploy to production when ready