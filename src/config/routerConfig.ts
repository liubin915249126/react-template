import * as React from "react";
import index from '@/pages/index/index';
import sort from '@/pages/Sort/Sort';

export interface RouterConfig {
    icon: string;
    name: string;
    url: string;
    hide?: boolean;
    resourceNameCn?: string;
    exact?: boolean;
    children?: RouterConfig[];
}

interface ComponentLink {
    [propName: string]: React.FC | React.Component | React.ComponentType | any;
}

const componentLink: ComponentLink = {
    index,
    sort
}


const routerConfig: RouterConfig[] = [
    {
        icon:'user',
        name:'首页',
        url:'index',
        
    },
    {
        icon:'user',
        name:'排序',
        url:'sort',
    },
]


export {
    componentLink
}
export default routerConfig;