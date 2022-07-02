declare module "*.png";
type IExerciceBox = {
    title: string;
    onClick?: () => void;
}
type IRange = {
    min: number;
    max: number;
    onChangeMinValue?: (number: number) => void;
    onChangeMaxValue?: (number: number) => void;
    range?: number[];
  }

  type  IHeader = {
    title: string;
    backButton?: boolean;
  }