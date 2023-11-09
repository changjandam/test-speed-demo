import styles from './App.module.scss';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email('Invalid email'),
});

type FormValues = z.infer<typeof formSchema>;

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors: { email: emailError },
    },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const email = watch('email');

  return (
    <div className={styles.app}>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          type='email'
          placeholder='enter email'
          {...register('email')}
        />
        <p className={styles.errorMessage}>{emailError?.message}</p>
        <button
          type='submit'
          className={styles.submitButton}
          disabled={!email || !!emailError}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
