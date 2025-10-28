"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export const AGENTS = [
  {
    id: "acbuy",
    name: "Acbuy",
    description: "Best, cheapest and fastest",
    icon: "/agent-icons/acbuy.png",
    key: "acbuy_link" as const,
    recommended: true,
  },
  {
    id: "kakobuy",
    name: "Kakobuy",
    icon: "/agent-icons/kakobuy.png",
    key: "kakobuy_link" as const,
  },
  {
    id: "cnfans",
    name: "CNFans",
    icon: "/agent-icons/cnfans.png",
    key: "cnfans_link" as const,
  },
  {
    id: "allchinabuy",
    name: "AllChinaBuy",
    icon: "/agent-icons/allchinabuy.png",
    key: "allchinabuy_link" as const,
  },
]

interface AgentSelectorProps {
  selectedAgent: string
  onSelectAgent: (agentId: string) => void
  availableAgents?: string[]
}

export function AgentSelector({ selectedAgent, onSelectAgent, availableAgents }: AgentSelectorProps) {
  const agents = availableAgents ? AGENTS.filter((agent) => availableAgents.includes(agent.id)) : AGENTS

  return (
    <div className="space-y-2">
      {agents.map((agent) => (
        <button
          key={agent.id}
          onClick={() => onSelectAgent(agent.id)}
          className={cn(
            "w-full flex items-center gap-3 p-4 rounded-lg border transition-all text-left",
            selectedAgent === agent.id
              ? "border-white bg-zinc-900"
              : "border-zinc-800 bg-transparent hover:border-zinc-700",
          )}
        >
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
            <span className="text-2xl">
              {agent.id === "acbuy" ? "🟢" : agent.id === "kakobuy" ? "🔴" : agent.id === "cnfans" ? "🔴" : "🔵"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-white">{agent.name}</div>
            {agent.description && <div className="text-sm text-zinc-400">{agent.description}</div>}
          </div>
          {selectedAgent === agent.id && <Check className="w-5 h-5 flex-shrink-0 text-white" />}
        </button>
      ))}
    </div>
  )
}
