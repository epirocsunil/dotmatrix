type MatrixCell = {
  id: number;
  img: string;
  pred: {
    confidence: number;
    index: number;
    label: string;
  };
  newValue: string | null;
};

type MatrixSettings = {
  x: number;
  y: number;
  h: number;
  w: number;
};

type TfLiteResult = {
  confidence: number;
  index: number;
  label: string;
};
