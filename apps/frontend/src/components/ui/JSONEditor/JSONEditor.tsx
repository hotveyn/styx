import { FC, useEffect, useRef } from "react";
import {
  JSONEditor as JSONEditorComponent,
  JSONEditorPropsOptional,
} from "vanilla-jsoneditor";

const JSONEditor: FC<JSONEditorPropsOptional> = (props) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refEditor = useRef<JSONEditorComponent | null>(null);

  useEffect(() => {
    refEditor.current = new JSONEditorComponent({
      target: refContainer.current!,
      props: {},
    });

    return () => {
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (refEditor.current) {
      refEditor.current.updateProps(props);
    }
  }, [props]);

  return <div ref={refContainer} />;
};

export default JSONEditor;
