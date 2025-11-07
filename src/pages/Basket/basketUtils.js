export const changePayloadForBackend = (basketItems) =>
{
    const result = [];

    basketItems.forEach((item) =>
    {
        result.push({
            id: item.id,
            amount: item.quantity,
            extra_of: null,
        });

        if (Array.isArray(item.extra) && item.extra.length > 0)
        {
            item.extra.forEach((extra) =>
            {
                result.push({
                    id: extra.id,
                    amount: extra.quantity,
                    extra_of: item.id,
                });
            });
        }
    });

    return result;
};