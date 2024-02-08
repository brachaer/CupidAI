import {OpenAI} from "openai";

const generateIdealPartnerProfile = async ({ userPreferences }: { userPreferences: string }) => {
  try {
    const openai = new OpenAI({apiKey : process.env.OPENAI_API_KEY });;  

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPreferences}
      ],
    });
   
    const idealPartnerProfile = (response.choices[0]?.message?.content?.trim() ?? '') as string;
    console.log(idealPartnerProfile);
    const { userKeywords, idealPartnerKeywords, partnerLocations } = processIdealPartnerProfile(idealPartnerProfile);

    return { userKeywords, idealPartnerKeywords, partnerLocations };
  } catch (error) {
    console.error('Error generating ideal partner profile:', error);
    throw error;
  }
};

const processIdealPartnerProfile = (idealPartnerProfile: string) => {
    try {
        const parsedResponse = JSON.parse(idealPartnerProfile);
        const userKeywords = parsedResponse.userKeywords || [];
        const idealPartnerKeywords = parsedResponse.idealPartnerKeywords || [];
        const partnerLocations = parsedResponse.partnerLocations || [];
    
        return { userKeywords, idealPartnerKeywords, partnerLocations };
    } catch (error) {
        console.error('Error parsing OpenAI response:', error);
        return { userKeywords: [],idealPartnerKeywords: [], partnerLocations: [] };
    }
};

const systemPrompt=`
Given a user's self-depiction, generate keywords for an ideal partner and suggest potential locations or scenarios where the user might find someone matching their ideal partner profile.

Rules:
1. The user's self-depiction will be provided as input.
2. Extract keywords that represent essential traits and preferences from the user's self-depiction.
3. Consider a range of attributes, including personality traits, hobbies, and lifestyle preferences.
4. Generate keywords for the ideal partner based on the user's self-depiction.
5. Suggest potential locations or scenarios where the user might find someone matching their ideal partner profile.
6. Ensure that the generated keywords are respectful and inclusive.
7. The response should be a JSON object with the following keys:
   - "userKeywords": An array of key words extracted from the user's self-depiction.
   - "idealPartnerKeywords": An array of key words representing the ideal partner.
   - "partnerLocations": An array of locations or scenarios where the user might find someone matching the ideal partner profile.

Example:
User's self-depiction: "27 years old, BA in computer science, programmer at Google, loves pets, enjoys dance festivals."

Response:
{
  "userKeywords": ["27 years old", "BA in computer science", "programmer", "Google", "pets", "dance festivals"],
  "idealPartnerKeywords": ["similar age", "interest in computer science", "programmer", "pet lover", "enjoys dance festivals"],
  "partnerLocations": ["tech events", "dance festivals", "pet-friendly parks"]
}
`

export default generateIdealPartnerProfile;
