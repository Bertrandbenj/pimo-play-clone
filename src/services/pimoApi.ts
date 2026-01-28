const API_URL = 'http://localhost:8080/pimo/exec';
const USE_MOCK = true; // Set to false when connecting to real backend

interface PimoRequest {
  config: string;
  input: string;
}

interface PimoResponse {
  output: string;
  error?: string;
}

// Mock masking function that simulates PIMO behavior
function mockMask(config: string, input: string): string {
  try {
    const inputData = JSON.parse(input);
    
    // Simple mock: replace common field patterns
    const masked = JSON.parse(JSON.stringify(inputData));
    
    const mockTransform = (obj: Record<string, unknown>): void => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          mockTransform(obj[key] as Record<string, unknown>);
        } else if (typeof obj[key] === 'string') {
          if (key.toLowerCase().includes('name')) {
            obj[key] = ['Jean Dupont', 'Marie Martin', 'Pierre Bernard'][Math.floor(Math.random() * 3)];
          } else if (key.toLowerCase().includes('email')) {
            obj[key] = 'masked@example.com';
          } else if (key.toLowerCase().includes('phone')) {
            obj[key] = '+33 6 XX XX XX XX';
          } else if (key.toLowerCase().includes('address')) {
            obj[key] = '123 Rue Anonyme, 75001 Paris';
          }
        } else if (typeof obj[key] === 'number' && key.toLowerCase().includes('age')) {
          obj[key] = Math.floor(Math.random() * 50) + 18;
        }
      }
    };
    
    if (Array.isArray(masked)) {
      masked.forEach((item) => {
        if (typeof item === 'object' && item !== null) {
          mockTransform(item as Record<string, unknown>);
        }
      });
    } else if (typeof masked === 'object') {
      mockTransform(masked as Record<string, unknown>);
    }
    
    return JSON.stringify(masked, null, 2);
  } catch {
    return input;
  }
}

export async function executePimo(config: string, input: string): Promise<PimoResponse> {
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    console.log('PIMO Mock Request:', { config, input });
    
    const output = mockMask(config, input);
    console.log('PIMO Mock Response:', { output });
    
    return { output };
  }
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ config, input } as PimoRequest),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { output: JSON.stringify(data, null, 2) };
  } catch (error) {
    console.error('PIMO API Error:', error);
    return { 
      output: '', 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}
