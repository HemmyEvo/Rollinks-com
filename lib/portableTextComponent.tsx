// lib/portableTextComponents.ts
import { PortableTextComponents } from '@portabletext/react';
import { urlFor } from './sanity';

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      
      return (
        <div className="my-4">
          <img 
            src={urlFor(value).width(800).url()} 
            alt={value.alt || 'Product image'} 
            className="rounded-lg max-w-full h-auto"
            loading="lazy"
          />
          {value.caption && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold my-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold my-2">{children}</h4>,
    normal: ({ children }) => <p className="my-2">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 my-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 my-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="my-1">{children}</li>,
    number: ({ children }) => <li className="my-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">
        {children}
      </code>
    ),
  },
};
