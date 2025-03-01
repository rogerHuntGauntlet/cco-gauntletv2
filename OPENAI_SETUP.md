# Setting Up OpenAI for VIBE Assistant

## Overview

This project has been updated to use OpenAI's API instead of AWS Bedrock for AI text generation. This guide provides instructions for setting up and configuring the OpenAI integration.

## Prerequisites

1. An OpenAI account (sign up at https://platform.openai.com)
2. An OpenAI API key (generate one in your OpenAI account dashboard)

## Configuration Steps

1. **Set Your API Key**

   Edit the `.env.local` file and replace the placeholder with your actual OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

2. **Choose Your Model**

   By default, the application uses `gpt-3.5-turbo` which is a good balance of performance and cost. If you want to use a different model, update the following line in `.env.local`:

   ```
   DEFAULT_OPENAI_MODEL=gpt-3.5-turbo
   ```

   Available options include:
   - `gpt-3.5-turbo` - Good balance of capability vs. cost
   - `gpt-4` - More capable but more expensive
   - `gpt-4-turbo` - Enhanced capabilities with better performance
   - `gpt-4-vision-preview` - Includes vision capabilities

3. **Restart Your Application**

   After updating the environment variables, restart your Next.js application for the changes to take effect.

## Usage Notes

- The VIBE chat panel will now display which OpenAI model is being used.
- You can click on the model name to see more details.
- If the API key is invalid or expired, you'll see an appropriate error message in the chat.

## Troubleshooting

1. **API Key Issues**
   - Ensure your API key is valid and hasn't expired
   - Check that you have billing set up in your OpenAI account
   - Verify the key has the necessary permissions

2. **Rate Limiting**
   - OpenAI implements rate limits. If you're receiving errors, you might be exceeding these limits
   - Consider upgrading your OpenAI plan if you need higher limits

3. **Model Availability**
   - Not all models might be available to your account, especially newer ones
   - Check the OpenAI documentation for current model availability

## Cost Management

Be aware that using OpenAI's API incurs costs based on the number of tokens processed. Monitor your usage in the OpenAI dashboard to avoid unexpected charges.

---

For more information, refer to the [OpenAI API documentation](https://platform.openai.com/docs/introduction). 