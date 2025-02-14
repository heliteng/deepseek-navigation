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
          description: '由deepseek官方提供',
          icon: '/images/logos/deepseek.png',
          iconBgColor: '#1a1a1a',
          category: 'tools',
          tags: ['官方','免费','需要注册']
        },
        {
          title: 'Chat Stream',
          url: 'https://www.chatstream.org/cn/chat/deepseek-r1#try-chat',
          description: 'R1满血版、V3满血版',
          icon: '/images/logos/chatstream.ico',
          iconBgColor: '#ebfffa',
          category: 'tools',
          tags: ['免费','满血版','免注册']
        },
        {
          title: '超算互联网',
          url: 'https://chat.scnet.cn/',
          description: '选择R1-671B模型',
          icon: '/images/logos/scnet.ico',
          iconBgColor: '#ffe2e2',
          category: 'tools',
          tags: ['免费','满血版','免注册']
        },
        {
          title: '秘搭AI',
          url: 'https://metaso.cn/',
          description: '勾选“长思考⋅R1”',
          icon: '/images/logos/metaso.ico',
          iconBgColor: '#ffffff',
          category: 'tools',
          tags: ['免费','满血版','免注册']
        },
        {
          title: '360纳米AI',
          url: 'https://www.n.cn/',
          description: '提问后在右下角切换到deepseek',
          icon: '/images/logos/360.ico',
          iconBgColor: '#f8f8f8',
          category: 'tools',
          tags: ['免费','满血版','免注册']
        }
      ]
    },
    
  ]
}; 