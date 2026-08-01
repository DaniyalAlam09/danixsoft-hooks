'use client';
import { useForm } from '@danixsoft/hooks';
import CodeBlock from '@/components/CodeBlock';

export default function UseFormPage() {
  const { values, handleChange, handleSubmit, errors } = useForm({
    initialValues: { email: '', name: '' },
    validate: (vals) => {
      const errs: any = {};
      if (!vals.email.includes('@')) errs.email = 'Invalid email';
      if (vals.name.length < 3) errs.name = 'Name too short';
      return errs;
    },
    onSubmit: (vals) => alert(JSON.stringify(vals, null, 2))
  });

  const codeString = `
import { useForm } from '@danixsoft/hooks';

function ContactForm() {
  const { values, handleChange, handleSubmit, errors } = useForm({
    initialValues: { email: '', name: '' },
    validate: (vals) => {
      const errs: any = {};
      if (!vals.email.includes('@')) errs.email = 'Invalid email';
      if (vals.name.length < 3) errs.name = 'Name too short';
      return errs;
    },
    onSubmit: (vals) => alert(JSON.stringify(vals))
  });

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={values.name} onChange={handleChange} />
      {errors.name && <span>{errors.name}</span>}

      <input name="email" value={values.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
  `;

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">useForm</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Simple form state and validation.</p>
      </div>
      <div id="demo" className="bg-white dark:bg-[#1e1e1e]  rounded p-8 max-w-md shadow-md dark:shadow-none dark:border dark:border-white/10 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Name</label>
            <input name="name" value={values.name} onChange={handleChange} className="w-full bg-neutral-50 dark:bg-[#121212]  rounded px-3 py-2 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            {errors.name && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
            <input name="email" value={values.email} onChange={handleChange} className="w-full bg-neutral-50 dark:bg-[#121212]  rounded px-3 py-2 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <button type="submit" className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded w-full hover:bg-blue-500 transition-colors shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] uppercase tracking-wider">Submit Form</button>
        </form>
      </div>
      <CodeBlock code={codeString} />
    </div>
  );
}
