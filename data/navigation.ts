export interface NavItem {
  title: string;
  url: string;
  icon?: string;
  iconBgColor?: string;
  description: string;
  category: string;
  tags: string[];
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  items: NavItem[];
}

export const navigation: Navigation = {
  categories: [
    {
      name: '满血版',
      slug: 'tools',
      description: '',
      items: [
        {
          title: 'DeepSeek',
          url: 'https://chat.deepseek.com/',
          description: '深度求索',
          icon: '/images/logos/deepseek.png',
          iconBgColor: '#1a1a1a',
          category: 'tools',
          tags: ['官方','免费','需要注册']
        },
        {
          title: '秘搭AI',
          url: 'https://metaso.cn/',
          description: '全球最大的搜索引擎',
          icon: '/images/logos/metaso.ico',
          iconBgColor: '#ffffff',
          category: 'tools',
          tags: ['免费','满血版','免注册']
        },
        {
          title: '360纳米AI',
          url: 'https://www.n.cn/',
          description: 'OpenAI 开发的 AI 对话助手',
          icon: '/images/logos/360.ico',
          iconBgColor: '#f8f8f8',
          category: 'tools',
          tags: ['免费','满血版','免注册']
        },
        {
          title: 'IMYAI',
          url: 'https://super.imyai.top/chat',
          description: '在应用广场搜索“deepseek”',
          icon: '/images/logos/imyai.ico',
          iconBgColor: '#ffecda',
          category: 'tools',
          tags: ['免费','满血版','需要注册']
        }
      ]
    },
    
  ]
}; 