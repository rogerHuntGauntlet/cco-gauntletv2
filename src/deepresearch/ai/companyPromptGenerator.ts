/**
 * Generates a comprehensive research prompt for a company.
 * This function takes a company name and returns a structured prompt
 * that can be used to research the company in depth.
 */
export function generateCompanyPrompt(companyName: string): string {
  return `
Research the company: ${companyName}

Please provide a comprehensive analysis of ${companyName} covering the following aspects:

1. Company Overview:
   - Brief history and founding
   - Mission, vision, and core values
   - Current CEO and key leadership team

2. Business Model and Products/Services:
   - Main products or services offered
   - Revenue streams and business model
   - Target market and customer base
   - Unique selling propositions and competitive advantages

3. Market Position and Competition:
   - Market share and industry position
   - Major competitors and competitive landscape
   - SWOT analysis (Strengths, Weaknesses, Opportunities, Threats)

4. Financial Performance:
   - Recent revenue, profit, and growth metrics
   - Stock performance (if publicly traded)
   - Key financial ratios and indicators
   - Funding rounds and investments (if private)

5. Innovation and Technology:
   - R&D initiatives and innovation strategy
   - Key technologies used or developed
   - Patents and intellectual property
   - Recent product launches or technological advancements

6. Corporate Strategy:
   - Current business strategy and future plans
   - Expansion efforts and new market entries
   - Mergers, acquisitions, or partnerships
   - Diversification or specialization strategies

7. Challenges and Controversies:
   - Current challenges facing the company
   - Past or ongoing controversies or legal issues
   - Regulatory concerns or compliance issues

8. Corporate Social Responsibility:
   - Environmental initiatives and sustainability efforts
   - Social impact programs and community engagement
   - Diversity and inclusion policies
   - Ethical practices and governance

9. Recent News and Developments:
   - Major announcements in the past year
   - Leadership changes or restructuring
   - Significant events affecting the company

10. Future Outlook:
    - Growth projections and future potential
    - Upcoming products or services
    - Industry trends affecting the company
    - Analyst predictions and market sentiment

Please provide detailed, factual information with specific data points where available. Include relevant statistics, dates, and figures to support the analysis.
`.trim();
} 