(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{169:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return m})),r.d(t,"default",(function(){return s}));var n=r(1),o=(r(0),r(222));const i={title:"v0.5.x to v0.6.x"},c={id:"migration-guides/v0.5.x-to-v0.6.x",title:"v0.5.x to v0.6.x",description:"### `@InjectTypeOrmQueryService`",source:"@site/docs/migration-guides/v0.5.x-to-v0.6.x.md",permalink:"/nestjs-query/docs/migration-guides/v0.5.x-to-v0.6.x",editUrl:"https://github.com/doug-martin/nestjs-query/edit/master/documentation/docs/migration-guides/v0.5.x-to-v0.6.x.md",sidebar:"docs",previous:{title:"Federation",permalink:"/nestjs-query/docs/graphql/federation"},next:{title:"v0.10.x to v0.11.x",permalink:"/nestjs-query/docs/migration-guides/v0.10.x-to-v0.11.x"}},m=[{value:"<code>@InjectTypeOrmQueryService</code>",id:"injecttypeormqueryservice",children:[]},{value:"<code>TypeOrmQueryService</code>",id:"typeormqueryservice",children:[]},{value:"<code>AssemblerQueryService</code>",id:"assemblerqueryservice",children:[]}],a={rightToc:m};function s({components:e,...t}){return Object(o.b)("wrapper",Object(n.a)({},a,t,{components:e,mdxType:"MDXLayout"}),Object(o.b)("h3",{id:"injecttypeormqueryservice"},Object(o.b)("inlineCode",{parentName:"h3"},"@InjectTypeOrmQueryService")),Object(o.b)("p",null,"In the ",Object(o.b)("inlineCode",{parentName:"p"},"v0.6.x")," an new decorator was added ",Object(o.b)("inlineCode",{parentName:"p"},"@InjectTypeOrmQueryService")," to auto-create a TypeOrm query service."),Object(o.b)("p",null,"This means you no longer need to manually create a service in order to expose your CRUD endpoints."),Object(o.b)("p",null,"To enable decorator import the ",Object(o.b)("inlineCode",{parentName:"p"},"NestjsQueryTypeOrmModule")," to your module definition"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';\nimport { Module } from '@nestjs/common';\nimport { TodoItemEntity } from './todo-item.entity';\nimport { TodoItemResolver } from './todo-item.resolver';\n\n@Module({\n  providers: [TodoItemResolver],\n  imports: [NestjsQueryTypeOrmModule.forFeature([TodoItemEntity])],\n})\nexport class TodoItemModule {}\n")),Object(o.b)("p",null,"One you have imported the module you can inject a ",Object(o.b)("inlineCode",{parentName:"p"},"TypeOrmQueryService"),"."),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { QueryService } from '@nestjs-query/core';\nimport { CRUDResolver } from '@nestjs-query/query-graphql';\nimport { Resolver } from '@nestjs/graphql';\nimport { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';\nimport { TodoItemDTO } from './dto/todo-item.dto';\nimport { TodoItemEntity } from './todo-item.entity';\n\n@Resolver(() => TodoItemDTO)\nexport class TodoItemResolver extends CRUDResolver(TodoItemDTO) {\n  constructor(@InjectTypeOrmQueryService(TodoItemEntity) readonly service: QueryService<TodoItemEntity>) {\n    super(service);\n  }\n}\n")),Object(o.b)("h2",{id:"typeormqueryservice"},Object(o.b)("inlineCode",{parentName:"h2"},"TypeOrmQueryService")),Object(o.b)("p",null,"In the previous version of ",Object(o.b)("inlineCode",{parentName:"p"},"@nestjs-query")," the ",Object(o.b)("inlineCode",{parentName:"p"},"TypeOrmQueryService")," translated between the DTO and Entity. For a more in-depth description see ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/doug-martin/nestjs-query/issues/41"}),"#41")),Object(o.b)("p",null,"In the latest version the ",Object(o.b)("inlineCode",{parentName:"p"},"TypeOrmQueryService")," only operates on entities."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"v0.5.x")),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { QueryService } from '@nestjs-query/core';\nimport { TypeOrmQueryService } from '@nestjs-query/query-typeorm';\nimport { InjectRepository } from '@nestjs/typeorm';\nimport { Repository } from 'typeorm';\nimport { TodoItemDTO } from './todo-item.dto';\nimport { TodoItemEntity } from './todo-item.entity';\n\n@QueryService(TodoItemDTO)\nexport class TodoItemService extends TypeOrmQueryService<TodoItemDTO, TodoItemEntity> {\n  constructor(@InjectRepository(TodoItemEntity) readonly repo: Repository<TodoItemEntity>) {\n    super(repo);\n  }\n}\n")),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"v0.6.x")),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { QueryService } from '@nestjs-query/core';\nimport { TypeOrmQueryService } from '@nestjs-query/query-typeorm';\nimport { InjectRepository } from '@nestjs/typeorm';\nimport { Repository } from 'typeorm';\nimport { TodoItemEntity } from './todo-item.entity';\n\n@QueryService(TodoItemEntity)\nexport class TodoItemService extends TypeOrmQueryService<TodoItemEntity> {\n  constructor(@InjectRepository(TodoItemEntity) readonly repo: Repository<TodoItemEntity>) {\n    super(repo);\n  }\n}\n")),Object(o.b)("h2",{id:"assemblerqueryservice"},Object(o.b)("inlineCode",{parentName:"h2"},"AssemblerQueryService")),Object(o.b)("p",null,"In previous versions of ",Object(o.b)("inlineCode",{parentName:"p"},"nestjs-query")," the ",Object(o.b)("inlineCode",{parentName:"p"},"QueryService")," would automatically translate betwen your DTO and database type. This created a soft-dependecy between the persistence service and the view layer. In ",Object(o.b)("inlineCode",{parentName:"p"},"v0.6.0")," ",Object(o.b)("inlineCode",{parentName:"p"},"AssemblerQueryService")," was introduced to handle translating between your DTO and persistence type."),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { AssemblerQueryService, QueryService } from '@nestjs-query/core';\nimport { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';\nimport { TodoItemDTO } from './todo-item.dto';\nimport { TodoItemAssembler } from './todo-item.assembler';\nimport { TodoItemEntity } from './todo-item.entity';\n\n@QueryService(TodoItemDTO)\nexport class TodoItemService extends AssemblerQueryService<TodoItemDTO, TodoItemEntity> {\n  constructor(\n    assembler: TodoItemAssembler,\n    @InjectTypeOrmQueryService(TodoItemEntity) queryService: QueryService<TodoItemEntity>,\n  ) {\n    super(assembler, queryService);\n  }\n}\n")))}s.isMDXComponent=!0},222:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return l}));var n=r(0),o=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=o.a.createContext({}),p=function(e){var t=o.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):m({},t,{},e)),r},u=function(e){var t=p(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},y={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=Object(n.forwardRef)((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,c=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),u=p(r),d=n,l=u["".concat(c,".").concat(d)]||u[d]||y[d]||i;return r?o.a.createElement(l,m({ref:t},s,{components:r})):o.a.createElement(l,m({ref:t},s))}));function l(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,c=new Array(i);c[0]=d;var m={};for(var a in t)hasOwnProperty.call(t,a)&&(m[a]=t[a]);m.originalType=e,m.mdxType="string"==typeof e?e:n,c[1]=m;for(var s=2;s<i;s++)c[s]=r[s];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);