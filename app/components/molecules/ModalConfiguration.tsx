import React from 'react';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { Modal } from '@/atoms/Modal';
import { Button } from '@/atoms/Button';
import { TimeToTimer } from '@/store';
import { AvailableStates } from '@/store';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  setValue: (value: TimeToTimer) => void;
  currentValues: Record<AvailableStates, number>;
}

interface formikProps {
  pomodoroTime: number;
  shortPauseTime: number;
  longPauseTime: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyInput = ({ field, ...props }: { field: any }) => (
  <input className="border w-14 bg-neutral-95 px-1 rounded-md" {...field} {...props} />
);

/**
 * Pop-up window displaying timer time settings.
 *
 **/
export const ModalConfiguration = ({ isOpen, onClose, setValue, currentValues }: Props) => {
  return (
    <Modal isOpen={isOpen} title="Configuraciones" onClose={onClose}>
      <Formik<formikProps>
        initialValues={{
          pomodoroTime: currentValues['pomodoro'],
          shortPauseTime: currentValues['shortPause'],
          longPauseTime: currentValues['longPause'],
        }}
        onSubmit={(values) => {
          setValue({ timerName: 'pomodoro', time: values.pomodoroTime });
          setValue({ timerName: 'shortPause', time: values.shortPauseTime });
          setValue({ timerName: 'longPause', time: values.longPauseTime });
        }}
      >
        {({ submitForm }) => (
          <FormikForm id="enter_times">
            <div className="space-y-4 pt-3">
              <span className="font-semibold">{'Tiempos (minutos)'}</span>
              <div className="flex justify-center items-center space-x-4">
                <div className="flex flex-col items-center space-y-1.5">
                  <span>Pomodoro</span>
                  <FormikField name="pomodoroTime" min="0" type="number" component={MyInput} />
                </div>
                <div className="flex flex-col items-center space-y-1.5">
                  <span>Pausa Corta</span>
                  <FormikField name="shortPauseTime" min="0" type="number" component={MyInput} />
                </div>
                <div className="flex flex-col items-center space-y-1.5">
                  <span>Pausa Larga</span>
                  <FormikField name="longPauseTime" min="0" type="number" component={MyInput} />
                </div>
              </div>
            </div>
            <div className="pt-5">
              <Button
                onClick={() => {
                  submitForm();
                  onClose();
                }}
              >
                Guardar
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};
