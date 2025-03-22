
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Info, AlertTriangle } from 'lucide-react';

interface ResultsDisplayProps {
  showResults: boolean;
  aiProbability: number;
  mediaType: 'image' | 'video' | 'audio' | 'text';
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  showResults, 
  aiProbability,
  mediaType 
}) => {
  if (!showResults) return null;

  // Sample data for visualizations
  const pieData = [
    { name: 'AI Generated', value: aiProbability },
    { name: 'Human Created', value: 100 - aiProbability }
  ];
  
  const barData = [
    { name: 'Pattern Recognition', ai: 85, human: 15 },
    { name: 'Stylistic Analysis', ai: 78, human: 22 },
    { name: 'Semantic Features', ai: 92, human: 8 },
    { name: 'Structural Elements', ai: 65, human: 35 },
  ];
  
  const COLORS = ['#4f46e5', '#94a3b8'];
  
  // Determine confidence level text and color
  let confidenceText, confidenceColor;
  if (aiProbability > 80) {
    confidenceText = 'High Confidence: AI-Generated';
    confidenceColor = 'text-red-500';
  } else if (aiProbability > 50) {
    confidenceText = 'Medium Confidence: Likely AI-Generated';
    confidenceColor = 'text-amber-500';
  } else {
    confidenceText = 'Low Confidence: Likely Human-Created';
    confidenceColor = 'text-green-500';
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 animate-fade-in">
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold mb-2">Analysis Results</h2>
          <p className="text-muted-foreground">
            Here's what our AI detection system found about your {mediaType}
          </p>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">AI Probability</h3>
                <div className={`px-3 py-1 rounded-full ${
                  aiProbability > 70 ? 'bg-red-100 text-red-600' : 
                  aiProbability > 40 ? 'bg-amber-100 text-amber-600' : 
                  'bg-green-100 text-green-600'
                }`}>
                  {aiProbability.toFixed(1)}%
                </div>
              </div>
              
              {/* Probability gauge */}
              <div className="w-full h-4 bg-muted rounded-full overflow-hidden mb-6">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-out"
                  style={{ width: `${aiProbability}%` }}
                ></div>
              </div>
              
              <div className={`mb-8 p-4 rounded-lg flex items-start gap-3 ${
                aiProbability > 70 ? 'bg-red-50' :
                aiProbability > 40 ? 'bg-amber-50' :
                'bg-green-50'
              }`}>
                {aiProbability > 50 ? (
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    aiProbability > 70 ? 'text-red-500' : 'text-amber-500'
                  }`} />
                ) : (
                  <Info className="w-5 h-5 mt-0.5 text-green-500" />
                )}
                
                <div>
                  <p className={`font-medium ${confidenceColor}`}>{confidenceText}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {aiProbability > 50
                      ? `This ${mediaType} shows characteristics typically found in AI-generated content.`
                      : `This ${mediaType} appears to be primarily human-created.`
                    }
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Key Findings</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  </div>
                  <span className="text-sm">
                    {mediaType === 'image' && 'Consistent patterns in pixel distributions'}
                    {mediaType === 'video' && 'Unnatural motion transitions between frames'}
                    {mediaType === 'audio' && 'Consistent voice tonal patterns throughout sample'}
                    {mediaType === 'text' && 'Repetitive phrase structures and predictable language patterns'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  </div>
                  <span className="text-sm">
                    {mediaType === 'image' && 'Artifacts in specific details (faces, text, backgrounds)'}
                    {mediaType === 'video' && 'Uniform lighting effects across scene changes'}
                    {mediaType === 'audio' && 'Lack of natural background noise variation'}
                    {mediaType === 'text' && 'Limited stylistic variation throughout the content'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  </div>
                  <span className="text-sm">
                    {mediaType === 'image' && 'Symmetric patterns in detail generation'}
                    {mediaType === 'video' && 'Consistent quality across different visual elements'}
                    {mediaType === 'audio' && 'Unnatural pauses and breathing patterns'}
                    {mediaType === 'text' && 'Statistical language patterns consistent with language models'}
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-6">Content Analysis</h3>
              
              <div className="h-[200px] mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Feature Analysis</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="ai" fill="#4f46e5" name="AI Indicator" />
                    <Bar dataKey="human" fill="#94a3b8" name="Human Indicator" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-muted/30 border-t border-border">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Analysis completed in 1.2 seconds
            </p>
            
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-smooth text-sm">
                Download Report
              </button>
              <button className="px-4 py-2 rounded-lg bg-primary text-white transition-smooth text-sm hover:bg-primary/90">
                New Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
