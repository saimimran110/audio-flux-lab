// Shared utilities for audio processing

export interface AudioSeparationResult {
  success: boolean;
  vocalsUrl?: string;
  instrumentalUrl?: string;
  error?: string;
}

export const SUPPORTED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/wav', 
  'audio/mp3',
  'audio/m4a',
  'audio/flac'
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function validateAudioFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (!SUPPORTED_AUDIO_TYPES.includes(file.type)) {
    return { valid: false, error: 'Unsupported audio format' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size too large (max 50MB)' };
  }

  return { valid: true };
}

export async function saveAudioToStorage(
  supabase: any,
  file: File,
  fileName: string
): Promise<string> {
  const { data, error } = await supabase.storage
    .from('audio-uploads')
    .upload(fileName, file);

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  return data.path;
}

export async function getPublicUrl(
  supabase: any,
  bucket: string,
  path: string
): Promise<string> {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
}