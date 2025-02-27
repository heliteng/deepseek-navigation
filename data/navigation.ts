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
      name: '推理型',
      slug: 'tools',
      description: '',
      items: [
        {
          title: '腾讯元宝',
          url: 'https://yuanbao.tencent.com',
          description: '强大算力，大厂值得信赖',
          icon: '/images/logos/yuanbao.png',
          iconBgColor: '#c3bef0',
          category: 'tools',
          tags: ['免费','满血版','需要注册']
        },{
          title: '当贝AI',
          url: 'https://ai.dangbei.com/chat',
          description: '支持多种模型',
          icon: '/images/logos/beidang.png',
          iconBgColor: '#c8d9eb',
          category: 'tools',
          tags: ['免费','满血版','免注册']
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
          description: '选择R1-671B模型，速度慢',
          icon: '/images/logos/scnet.ico',
          iconBgColor: '#ffe2e2',
          category: 'tools',
          tags: ['免费','满血版','免注册']
        },{
          title: 'DeepSeek',
          url: 'https://chat.deepseek.com/',
          description: '由deepseek官方提供',
          icon: '/images/logos/deepseek.png',
          iconBgColor: '#1a1a1a',
          category: 'tools',
          tags: ['官方','免费','需要注册']
        },{
          title: '问小白',
          url: 'https://www.wenxiaobai.com/chat',
          description: '支持创建智能体',
          icon: '/images/logos/wenxiaobai.png',
          iconBgColor: '#fecea8',
          category: 'tools',
          tags: ['免费','满血版','免注册']
        }
      ]
    },{
      name: '搜索型',
      slug: 'tools',
      description: '',
      items: [
       
        {
          title: '秘搭AI',
          url: 'https://metaso.cn/',
          description: '勾选“长思考⋅R1”',
          icon: '/images/logos/metaso.ico',
          iconBgColor: '#ffffff',
          category: 'tools',
          tags: ['免费','免注册']
        },
        {
          title: '360纳米AI',
          url: 'https://www.n.cn/',
          description: '提问后在右下角切换到deepseek',
          icon: '/images/logos/360.ico',
          iconBgColor: '#f8f8f8',
          category: 'tools',
          tags: ['免费','免注册']
        }
      ]
    },
    
  ]
}; 