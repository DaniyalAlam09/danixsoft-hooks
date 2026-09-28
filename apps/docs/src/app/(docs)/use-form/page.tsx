'use client';
import { useForm } from '@danixsoft/hooks';

export default function UseFormPage() {
  const { values, handleChange, handleSubmit, errors } = useForm({
    initialValues: { email: '', name: '' },
    validate: (vals) => {
      const errs: Partial<Record<'email' | 'name', string>> = {};
      if (!vals.email.includes('@')) errs.email = 'Invalid email';
      if (vals.name.length < 3) errs.name = 'Name too short';
      return errs;
    },
    onSubmit: (vals) => alert(JSON.stringify(vals, null, 2))
  });

  return (
    <div>
      <div className="bg-surface rounded p-8 max-w-md shadow-[var(--shadow-md)] border border-border mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-fg-muted mb-1">Name</label>
            <input name="name" value={values.name} onChange={handleChange} className="w-full bg-bg-subtle rounded px-3 py-2 text-fg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            {errors.name && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-fg-muted mb-1">Email</label>
            <input name="email" value={values.email} onChange={handleChange} className="w-full bg-bg-subtle rounded px-3 py-2 text-fg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <button type="submit" className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded w-full hover:bg-blue-500 transition-colors shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] uppercase tracking-wider">Submit Form</button>
        </form>
      </div>
    </div>
  );
}
