'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ExternalLink, Bot, Copy, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function MsgPrompt() {
  const [inputText, setInputText] = useState('')
  const [enhancedPromptText, setEnhancedPromptText] = useState(
    "provide the exact prompt I should share with an advanced LLM like yourself to get the most thorough response."
  )
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const getEnhancedPrompt = (text: string, platform: string) => {
    return `here's what i want: ${text} ${enhancedPromptText} Then share a ready-to-use clickable link (not in a code block) using this exact format: ${platform === 'Claude' ? 'https://claude.ai/remix#q=your_suggested_prompt_here' : 'https://chatgpt.com/?q=your_suggested_prompt_here'}`
  }

  const getClaudeUrl = (text: string) => {
    if (!text.trim()) return ''
    const enhancedPrompt = getEnhancedPrompt(text, 'Claude')
    const encodedText = encodeURIComponent(enhancedPrompt)
    return `https://claude.ai/remix#q=${encodedText}`
  }

  const getChatGPTUrl = (text: string) => {
    if (!text.trim()) return ''
    const enhancedPrompt = getEnhancedPrompt(text, 'ChatGPT')
    const encodedText = encodeURIComponent(enhancedPrompt)
    return `https://chatgpt.com/?q=${encodedText}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">MSG PROMPT</h1>
          <p className="text-xl text-gray-600">we pre prompt your LLMs so you don't have to</p>
        </header>

        <Card className="w-full mb-8">
          <CardHeader>
            <CardTitle>I want...</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Enter your prompt here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] w-full mb-4"
            />
          </CardContent>
        </Card>

        {inputText.trim() && (
          <div className="flex justify-between mb-4">
            {[
              { name: 'Claude', getUrl: getClaudeUrl, color: 'purple' },
              { name: 'ChatGPT', getUrl: getChatGPTUrl, color: 'green' }
            ].map((platform) => (
              <Button
                key={platform.name}
                className={`flex items-center bg-${platform.color}-500 hover:bg-${platform.color}-600 text-white`}
                onClick={() => window.open(platform.getUrl(inputText), '_blank')}
              >
                Open in {platform.name} <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            ))}
          </div>
        )}

        {inputText.trim() && (
          <div className="mb-8">
            <Button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              variant="outline"
              className="w-full flex justify-between items-center"
              aria-expanded={isAdvancedOpen}
              aria-controls="advanced-area"
            >
              <span>Don't click here unless you want to see how the sausage is made</span>
              {isAdvancedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        )}

        {inputText.trim() && isAdvancedOpen && (
          <div id="advanced-area">
            <Card className="w-full mb-8">
              <CardHeader>
                <CardTitle>Enhanced Prompt Text</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={enhancedPromptText}
                  onChange={(e) => setEnhancedPromptText(e.target.value)}
                  className="min-h-[80px] w-full mb-4"
                />
              </CardContent>
            </Card>

            {inputText.trim() && (
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { name: 'Claude', getUrl: getClaudeUrl, color: 'purple' },
                  { name: 'ChatGPT', getUrl: getChatGPTUrl, color: 'green' }
                ].map((platform) => (
                  <Card key={platform.name} className={`border-t-4 border-${platform.color}-500`}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bot className={`mr-2 text-${platform.color}-500`} />
                        {platform.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Enhanced Prompt:</h3>
                        <div className="text-sm break-words bg-gray-100 p-3 rounded border">
                          {getEnhancedPrompt(inputText, platform.name)}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Click to open in {platform.name}:</h3>
                        <a 
                          href={platform.getUrl(inputText)}
                          className={`text-sm text-${platform.color}-500 hover:text-${platform.color}-600 hover:underline break-all flex items-center gap-2`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {platform.getUrl(inputText)}
                          <ExternalLink className="h-4 w-4 inline-block flex-shrink-0" />
                        </a>
                      </div>
                    </CardContent>
                    <div className="flex justify-end items-center pt-4">
                      <Button
                        variant="outline"
                        className="flex items-center"
                        onClick={() => navigator.clipboard.writeText(platform.getUrl(inputText))}
                      >
                        <Copy className="mr-2 h-4 w-4" /> Copy URL
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
        <footer className="mt-8 text-center text-sm text-gray-600">
          <p>
            <a 
              href="http://x.com/msg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              Follow @msg on X
            </a>
          </p>
          <p className="mt-2">
            <a 
              href="https://github.com/mgalpert/msgprompt/issues" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              Suggest changes or improvements
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}