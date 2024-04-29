import ModalProvider from "@/components/shared/admin/subcription/SubcriptionModalProvider";
import { checkSubscription } from "@/app/libs/subscription";

export default async function subscription() {
  const is_SubscriptionValid = await checkSubscription();
  console.log(is_SubscriptionValid);
  return (
    <div>
      <ModalProvider is_subscriptionValid={is_SubscriptionValid} />
    </div>
  );
}
