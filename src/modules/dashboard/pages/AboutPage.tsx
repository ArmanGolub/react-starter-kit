import { Footer, Page, Section, Stack } from "@/common/components/layout";
import { field, fieldError, fieldLabel, inlineLink } from "@/common/styles";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type ContactFormValues = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

export const AboutPage = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: { name: "", email: "", topic: "", message: "" },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Contact form submitted:", data);
    reset();
  };

  return (
    <Page>
      <Section divider={false}>
        <Stack gap="lg">
          <Link to="/" className={inlineLink}>
            <ArrowLeft className="h-3 w-3" />
            {t("goHome")}
          </Link>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {t("about.title")}
          </h1>
          <p className="max-w-xl text-base text-muted-foreground">
            {t("about.description")}
          </p>
        </Stack>
      </Section>

      <Section label={t("about.contactLabel")} delay={0.1}>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          {t("about.contactTitle")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
          <Stack gap="xs">
            <label className={fieldLabel}>{t("about.form.name")}</label>
            <input
              type="text"
              className={field}
              placeholder={t("about.form.namePlaceholder")}
              {...register("name", {
                required: t("about.form.errors.nameRequired"),
              })}
            />
            {errors.name && <p className={fieldError}>{errors.name.message}</p>}
          </Stack>

          <Stack gap="xs">
            <label className={fieldLabel}>{t("about.form.email")}</label>
            <input
              type="email"
              className={field}
              placeholder={t("about.form.emailPlaceholder")}
              {...register("email", {
                required: t("about.form.errors.emailRequired"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("about.form.errors.emailInvalid"),
                },
              })}
            />
            {errors.email && (
              <p className={fieldError}>{errors.email.message}</p>
            )}
          </Stack>

          <Stack gap="xs">
            <label className={fieldLabel}>{t("about.form.topic")}</label>
            <input
              type="text"
              className={field}
              placeholder={t("about.form.topicPlaceholder")}
              {...register("topic")}
            />
          </Stack>

          <Stack gap="xs">
            <label className={fieldLabel}>{t("about.form.message")}</label>
            <textarea
              rows={4}
              className={field + " resize-none"}
              placeholder={t("about.form.messagePlaceholder")}
              {...register("message", {
                required: t("about.form.errors.messageRequired"),
                minLength: {
                  value: 10,
                  message: t("about.form.errors.messageTooShort"),
                },
              })}
            />
            {errors.message && (
              <p className={fieldError}>{errors.message.message}</p>
            )}
          </Stack>

          <div className="flex items-center justify-between pt-2">
            <p className="font-mono text-[11px] text-muted-foreground">
              {t("about.form.hint")}
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center gap-2 font-mono text-sm font-medium text-primary transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? t("about.form.sending") : t("about.form.send")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </form>
      </Section>

      <Footer />
    </Page>
  );
};
