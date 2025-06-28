import React, { ReactNode, ElementType } from 'react';

// Check if a value is a plain object literal
const isObjectLiteral = (value: any): boolean => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

// Remove duplicate class names from a string
const deduplicateClasses = (classes: string) =>
  [...new Set(classes.split(' '))].join(' ');

interface ClassProps {
  className?: string;
  toggleClasses?: Record<string, boolean>;
  children: ReactNode;
  as?: ElementType;
  [key: string]: any;
}

/**
 * Classes component that conditionally applies class names to a specified HTML element.
 *
 * @param className - The initial class name for the element.
 * @param toggleClasses - An object with condition-to-classes mappings.
 * @param children - The content to be rendered inside the specified HTML element.
 * @param as - The type of HTML element to render.
 * @param props - Any additional props to be passed to the element.
 * @returns The rendered Class component.
 */

export const Class: React.FC<ClassProps> = ({
  className = '',
  toggleClasses = {},
  children,
  as: Component = 'div',
  ...props
}) => {
  if (!isObjectLiteral(toggleClasses)) {
    console.error(
      'toggleClasses prop must be an object literal. Received:',
      toggleClasses,
    );

    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  let computedClassNames = className;

  for (const [classes, condition] of Object.entries(toggleClasses)) {
    if (condition) {
      computedClassNames += ` ${classes.trim()}`;
    }
  }

  computedClassNames = deduplicateClasses(computedClassNames);

  return (
    <Component className={computedClassNames} {...props}>
      {children}
    </Component>
  );
};
