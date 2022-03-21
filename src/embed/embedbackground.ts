import { Options } from '../options';
import embedResources from '../resources';

async function embedBackground<T extends HTMLElement>(
  clonedNode: T,
  options: Options
): Promise<T> {
  const background = clonedNode.style?.getPropertyValue('background');
  if (!background) {
    return Promise.resolve(clonedNode);
  }

  return Promise.resolve(background)
    .then(cssString => embedResources(cssString, null, options))
    .then(cssString => {
      clonedNode.style.setProperty(
        'background',
        cssString,
        clonedNode.style.getPropertyPriority('background')
      );

      return clonedNode;
    });
}

export default embedBackground;
